export class DictionaryController {
    private static instance: DictionaryController;
    private constructor() {}
    public static getInstance(): DictionaryController {
        if (!DictionaryController.instance) {
            DictionaryController.instance = new DictionaryController();
        }
        return DictionaryController.instance;
    }
    public filter(dictionary: string[]) {
        return dictionary.filter((word) => word.length < 7);
    }
    public generateRandomWords(dictionary: string[], amount: number): string[] {
        const randomWords = [];
        for (let i = 0; i < amount; i++) {
            randomWords.push(
                dictionary[Math.floor(Math.random() * dictionary.length)]
            );
        }
        return randomWords;
    }
}
