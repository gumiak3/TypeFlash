import { WordsRepository } from '../words.repository';
import { WordsService } from '../words.service';

describe('wordsService', () => {
  let wordsService: WordsService;
  let wordsRepository: WordsRepository;
  beforeEach(() => {
    wordsRepository = new WordsRepository();
    wordsService = new WordsService(wordsRepository);
  });
  describe('getAllWords', () => {
    it('should return an array of all words', async () => {
      const size = 1525;

      const result = await wordsService.getAllWords();
      expect(result.length).toBe(size);
      result.forEach((word) => {
        expect(typeof word).toBe('string');
      });
    });
  });
  describe('getRandomWords', () => {
    it('should return an array of random words', async () => {
      const size = 100;
      const result = await wordsService.getRandomWords(size);
      expect(result.length).toEqual(size);
      result.forEach((word) => {
        expect(typeof word).toBe('string');
      });
    });
  });
});
