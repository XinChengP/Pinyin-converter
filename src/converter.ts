/**
 * 拼音转换器核心类
 * 提供完整的汉字到拼音转换功能
 */

import { PinyinOptions, PinyinResult, IPinyinConverter } from './types';
import { PinyinDataLoader } from './data-loader';
import { PinyinUtils } from './utils';

export class PinyinConverter implements IPinyinConverter {
  private dataLoader: PinyinDataLoader;
  private dataLoaded = false;

  constructor() {
    this.dataLoader = PinyinDataLoader.getInstance();
  }

  /**
   * 初始化拼音转换器
   */
  async initialize(): Promise<void> {
    if (!this.dataLoaded) {
      await this.dataLoader.loadData();
      this.dataLoaded = true;
    }
  }

  /**
   * 将文本转换为拼音
   */
  convert(text: string, options: PinyinOptions = {}): PinyinResult[] {
    if (!this.dataLoaded) {
      throw new Error('PinyinConverter not initialized. Call initialize() first.');
    }

    const results: PinyinResult[] = [];
    const chars = Array.from(text);

    for (const char of chars) {
      const result = this.convertChar(char, options);
      results.push(result);
    }

    return results;
  }

  /**
   * 将文本转换为拼音字符串
   */
  convertToString(text: string, options: PinyinOptions = {}): string {
    const results = this.convert(text, options);
    const separator = options.separator ?? ' ';
    
    return results.map(result => {
      if (options.heteronym && result.isHeteronym) {
        return result.pinyin.join(',');
      }
      return result.pinyin[0];
    }).join(separator);
  }

  /**
   * 获取字符的多音字
   */
  getHeteronyms(char: string): string[] {
    if (!this.dataLoaded) {
      throw new Error('PinyinConverter not initialized. Call initialize() first.');
    }

    if (!this.isChinese(char)) return [];

    const unicode = this.dataLoader.charToUnicode(char);
    const data = this.dataLoader.getData();
    const pinyins = data[unicode] || [];

    return [...new Set(pinyins)]; // 去重
  }

  /**
   * 检查是否为中文
   */
  isChinese(char: string): boolean {
    return this.dataLoader.isChinese(char);
  }

  /**
   * 获取所有可用的拼音
   */
  getAvailablePinyins(): string[] {
    if (!this.dataLoaded) {
      throw new Error('PinyinConverter not initialized. Call initialize() first.');
    }

    const data = this.dataLoader.getData();
    const allPinyins = new Set<string>();

    for (const pinyins of Object.values(data)) {
      pinyins.forEach(pinyin => allPinyins.add(pinyin));
    }

    return Array.from(allPinyins).sort();
  }

  /**
   * 转换单个字符
   */
  private convertChar(char: string, options: PinyinOptions): PinyinResult {
    const defaultOptions: PinyinOptions = {
      keepTone: true,
      toneStyle: 'mark',
      heteronym: false,
      separator: ' ',
      lowercase: false,
      nonChinese: 'keep',
      replaceChar: ''
    };

    const opts = { ...defaultOptions, ...options };

    // 处理非中文字符
    if (!this.isChinese(char)) {
      return this.handleNonChinese(char, opts);
    }

    const unicode = this.dataLoader.charToUnicode(char);
    const data = this.dataLoader.getData();
    const pinyins = data[unicode] || [];

    // 如果没有找到拼音，返回原字符
    if (pinyins.length === 0) {
      return {
        origin: char,
        pinyin: [char],
        isHeteronym: false
      };
    }

    // 格式化拼音
    let formattedPinyins = pinyins.map(pinyin => {
      let formatted = PinyinUtils.formatPinyin(pinyin, opts.toneStyle!);
      
      if (opts.lowercase) {
        formatted = formatted.toLowerCase();
      }
      
      return formatted;
    });

    // 去重
    formattedPinyins = [...new Set(formattedPinyins)];

    return {
      origin: char,
      pinyin: formattedPinyins,
      isHeteronym: formattedPinyins.length > 1
    };
  }

  /**
   * 处理非中文字符
   */
  private handleNonChinese(char: string, options: PinyinOptions): PinyinResult {
    switch (options.nonChinese) {
      case 'remove':
        return {
          origin: char,
          pinyin: [''],
          isHeteronym: false
        };
      
      case 'replace':
        return {
          origin: char,
          pinyin: [options.replaceChar || ''],
          isHeteronym: false
        };
      
      case 'keep':
      default:
        return {
          origin: char,
          pinyin: [char],
          isHeteronym: false
        };
    }
  }

  /**
   * 获取拼音首字母
   */
  getInitials(text: string, options: PinyinOptions = {}): string[] {
    const results = this.convert(text, options);
    
    return results.map(result => {
      if (result.pinyin[0] && PinyinUtils.isValidPinyin(result.pinyin[0])) {
        return PinyinUtils.getInitial(result.pinyin[0]);
      }
      return result.origin;
    });
  }

  /**
   * 获取拼音首字母字符串
   */
  getInitialsString(text: string, options: PinyinOptions = {}): string {
    const initials = this.getInitials(text, options);
    const separator = options.separator ?? '';
    return initials.join(separator);
  }

  /**
   * 统计文本中的中文数量
   */
  countChinese(text: string): number {
    return Array.from(text).filter(char => this.isChinese(char)).length;
  }

  /**
   * 获取所有多音字
   */
  getAllHeteronyms(text: string): { char: string; pinyins: string[] }[] {
    const results: { char: string; pinyins: string[] }[] = [];
    const chars = Array.from(text);

    for (const char of chars) {
      if (this.isChinese(char)) {
        const heteronyms = this.getHeteronyms(char);
        if (heteronyms.length > 1) {
          results.push({
            char,
            pinyins: heteronyms
          });
        }
      }
    }

    return results;
  }
}