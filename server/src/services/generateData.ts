import Config  from "@/api/config";
import { sizeLimits } from "@/defines/constants";
import { GenerationTypes, InformationTypes, LongAnswerResponse } from "@/defines/types";
import { generateRouterTypeParams } from "@/routes/generate";
import { GenerativeModel, GoogleGenerativeAI, GoogleGenerativeAIFetchError} from "@google/generative-ai";

interface DataGenerationInformation {
    generationType: GenerationTypes,
    information: string,
    informationType: InformationTypes,
}

export default class DataGenerator {
    static #instance: DataGenerator;
    key : string;
    model : GenerativeModel;

    private constructor() {
        this.key = Config.API_KEY;
        const genAI = new GoogleGenerativeAI(this.key);
        this.model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: {
                responseMimeType: "application/json",
            }
        });
    }

    // Random string function
    // From https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    private makeid(length: number) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
        }
        return result;
    }

    private generatePrompt = async (information: string, infoType: InformationTypes, generationType: GenerationTypes) : Promise<string | null> => {
        this.model.generationConfig.responseSchema = Config.schemas[generationType];
        const split = Config.DELIMITER.split(' ');
        const info_prompt = this.makeid(10) + split[0] + information +split[1] + this.makeid(10) + '\r\n'; 
        const prompt = Config.generatePrompt(info_prompt, infoType, generationType);
        try {
            const result = await this.model.generateContent([info_prompt + prompt]);
            return result.response.text();
        }
        catch (e : unknown) {
            const err = e as GoogleGenerativeAIFetchError;
            console.log(err.message);
            return null;
        }
    }

    private generateLongAnswer = async (data: LongAnswerResponse[]) : Promise<string | null> => {
        this.model.generationConfig.responseSchema = Config.LongAnswerResult;
        const split = Config.DELIMITER.split(' ');
        for (const item of data) {
            item.question = this.makeid(10) + split[0] + item.question + split[1] + this.makeid(10) + '\r\n';
            item.answer = this.makeid(10) + split[0] + item.answer + split[1] + this.makeid(10) + '\r\n';
        }

        const prompt = Config.contextLongAnswer + '\r\n' + JSON.stringify(data);
        try {
            const result = await this.model.generateContent([prompt]);
            return result.response.text();
        }
        catch (e : unknown) {
            const err = e as GoogleGenerativeAIFetchError;
            console.log(err.message);
            return null;
        }
    }

    public static get getInstance(): DataGenerator {
        if (!DataGenerator.#instance) {
            DataGenerator.#instance = new DataGenerator();
        }
        return DataGenerator.#instance
    }

    public validate(dataObj : object, key: string) : boolean {
        try {
            switch (key) {
                case generateRouterTypeParams.dataset: {
                    const data = dataObj as DataGenerationInformation;
                    if (!data.generationType || !data.information || !data.informationType
                        || (data.information.length > sizeLimits.text) 
                    )
                        return false;
                    break;
                }
                case generateRouterTypeParams.long_answer: {
                    const data = dataObj as LongAnswerResponse[];
                    if (!data[0].answer || !data[0].question) {
                        return false;
                    }
                    break;
                }
                default:
                    return false;
            }
            return true;
        } catch (e: unknown) {
            return false;
        }
    }

    public async generateInformation(data : DataGenerationInformation) : Promise<string | null> {
        return await this.generatePrompt(data.information, data.informationType, data.generationType);
    }


 
    public async generateLongAnswerResponses(data: LongAnswerResponse[]) : Promise<string | null> {
        return await this.generateLongAnswer(data);
    }
}
