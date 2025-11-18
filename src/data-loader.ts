/**
 * 拼音数据加载器
 * 负责从数据文件中加载拼音映射数据
 */

import { PinyinData } from './types';

export class PinyinDataLoader {
  private static instance: PinyinDataLoader;
  private data: PinyinData = {};
  private loaded = false;

  // 常用汉字Unicode范围
  private readonly CJK_RANGES = [
    [0x4e00, 0x9fff],   // 基本汉字
    [0x3400, 0x4dbf],   // 扩展A
    [0x20000, 0x2a6df], // 扩展B
    [0x2a700, 0x2b73f], // 扩展C
    [0x2b740, 0x2b81f], // 扩展D
    [0x2b820, 0x2ceaf], // 扩展E
    [0x2ceb0, 0x2ebef], // 扩展F
  ];

  static getInstance(): PinyinDataLoader {
    if (!PinyinDataLoader.instance) {
      PinyinDataLoader.instance = new PinyinDataLoader();
    }
    return PinyinDataLoader.instance;
  }

  /**
   * 加载拼音数据
   */
  async loadData(): Promise<void> {
    if (this.loaded) return;

    try {
      // 优先使用kMandarin数据，然后使用pinyin.txt作为补充
      await this.loadMandarinData();
      await this.loadPinyinData();
      
      this.loaded = true;
      console.log(`拼音数据加载完成，共${Object.keys(this.data).length}个字符`);
    } catch (error) {
      console.error('加载拼音数据失败:', error);
      throw new Error('Failed to load pinyin data');
    }
  }

  /**
   * 获取拼音数据
   */
  getData(): PinyinData {
    if (!this.loaded) {
      throw new Error('Pinyin data not loaded. Call loadData() first.');
    }
    return this.data;
  }

  /**
   * 从kMandarin.txt加载数据
   */
  private async loadMandarinData(): Promise<void> {
    try {
      // 在浏览器环境中使用fetch，在Node.js环境中使用fs
      const mandarinData = await this.loadTextFile('../pinyin-data/kMandarin.txt');
      this.parseMandarinData(mandarinData);
    } catch (error) {
      console.warn('无法加载kMandarin数据，将使用pinyin.txt作为主要数据源');
    }
  }

  /**
   * 从pinyin.txt加载数据
   */
  private async loadPinyinData(): Promise<void> {
    try {
      const pinyinData = await this.loadTextFile('../pinyin-data/pinyin.txt');
      this.parsePinyinData(pinyinData);
    } catch (error) {
      console.error('无法加载pinyin数据:', error);
      throw error;
    }
  }

  /**
   * 加载文本文件
   */
  private async loadTextFile(path: string): Promise<string> {
    // 浏览器环境
    if (typeof window !== 'undefined') {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.text();
    }
    
    // Node.js环境
    if (typeof require !== 'undefined') {
      const fs = require('fs');
      const pathModule = require('path');
      const fullPath = pathModule.resolve(__dirname, path);
      return fs.readFileSync(fullPath, 'utf-8');
    }

    throw new Error('Unsupported environment');
  }

  /**
   * 解析kMandarin格式数据
   */
  private parseMandarinData(data: string): void {
    const lines = data.split('\n');
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine || trimmedLine.startsWith('#')) continue;

      const match = trimmedLine.match(/^U\+([0-9A-Fa-f]+):\s*(.+?)(?:\s*#.*)?$/);
      if (!match) continue;

      const unicode = match[1].toUpperCase();
      const pinyins = match[2].split(',').map(p => p.trim()).filter(p => p);
      
      if (pinyins.length > 0) {
        this.data[unicode] = pinyins;
      }
    }
  }

  /**
   * 解析pinyin.txt格式数据
   */
  private parsePinyinData(data: string): void {
    const lines = data.split('\n');
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine || trimmedLine.startsWith('#')) continue;

      const match = trimmedLine.match(/^U\+([0-9A-Fa-f]+):\s*(.+?)(?:\s*#.*)?$/);
      if (!match) continue;

      const unicode = match[1].toUpperCase();
      const pinyins = match[2].split(',').map(p => p.trim()).filter(p => p);
      
      // 如果kMandarin中已有数据，则合并
      if (this.data[unicode]) {
        // 合并并去重
        this.data[unicode] = [...new Set([...this.data[unicode], ...pinyins])];
      } else {
        this.data[unicode] = pinyins;
      }
    }
  }

  /**
   * 检查字符是否为中文
   */
  isChinese(char: string): boolean {
    if (!char || char.length !== 1) return false;
    
    const code = char.charCodeAt(0);
    
    // 检查是否在CJK范围内
    return this.CJK_RANGES.some(([start, end]) => code >= start && code <= end);
  }

  /**
   * 字符转Unicode编码
   */
  charToUnicode(char: string): string {
    if (!this.isChinese(char)) return '';
    return char.codePointAt(0)!.toString(16).toUpperCase().padStart(4, '0');
  }
}