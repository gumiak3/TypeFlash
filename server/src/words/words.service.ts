import { Injectable } from '@nestjs/common';
import { WordsRepository } from './words.repository';

@Injectable()
export class WordsService {
  constructor(private wordsRepository: WordsRepository) {}

  async getAllWords(): Promise<string[]> {
    return this.wordsRepository.getWords();
  }
  async getRandomWords(size: number): Promise<string[]> {
    const allWords = await this.getAllWords();
    const result: string[] = [];
    for (let i = 0; i < size; i++) {
      const randomIndex = Math.floor(Math.random() * allWords.length);
      result.push(allWords[randomIndex]);
    }
    return result;
  }
}
