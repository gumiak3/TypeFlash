import { Controller, Get } from '@nestjs/common';
import { WordsService } from './words.service';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}
  @Get('all')
  async getAllWords(): Promise<string[]> {
    return this.wordsService.getAllWords();
  }
  @Get('random')
  async getRandomWords(size: number): Promise<string[]> {
    return this.wordsService.getRandomWords(size);
  }
}
