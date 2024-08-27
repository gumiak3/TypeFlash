import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { WordsService } from './words.service';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}
  @Get('all')
  async getAllWords(): Promise<string[]> {
    return this.wordsService.getAllWords();
  }
  @Get('random/:size')
  async getRandomWords(@Param('size') size: number): Promise<string[]> {
    return this.wordsService.getRandomWords(size);
  }
}
