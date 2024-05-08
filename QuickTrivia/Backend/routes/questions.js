import axios from 'axios'
import { nanoid } from 'nanoid'

export let questions = [];
function decodeHTMLCharacterCodes(inputString) {
    return inputString.replace(/&#[0-9]+;|&[a-zA-Z]+;/g, function (match) {
        if (match.startsWith("&#")) {
            // Extract the numeric value from the HTML character code
            const numericValue = parseInt(match.slice(2, -1), 10);
            return String.fromCharCode(numericValue);
        } else {
            // Handle named entities (e.g., &, <, etc.)
            const entityName = match.slice(1, -1);
            const entityTable = {
                // Add more named entities as needed
                "sup2":'²',
                "sup3":'³',
                "aacute":'á',
                "uacute": 'ú',
                "eacute": 'é',
                "oacute": 'ó',
                "atilde": 'ã',
                "ntilde":'ñ',
                "quot": '"',
                "amp": '&',
                "lt": '<',
                "gt": '>',
                "laquo": '«',
                "rdquo": '”',
                'bdquo': '„',
                "hellip": '…',
                "rsquo": "’",
                "pi": 'π',
                "Pi": 'Π',
                "theta": 'θ',
                "alpha": 'α',
                "beta": 'β',
                "gamma": 'γ',
                "delta": 'δ',
                "epsilon": 'ε',
                "Omega": 'Ω',
                "Sigma": 'Σ',
                "Lambda": 'Λ',
                "Omicron": 'Ο',
                "Nu": 'Ν',
                "Mu": 'Μ',
                // ... other entities ...
            };
            return entityTable[entityName] || match;
        }
    });
}
export default async function getQuestions(custom_URL = null) {
    let API_URL = ""
    if (custom_URL === null) {
        API_URL = 'https://opentdb.com/api.php?amount=10&type=multiple'
    } else {
        API_URL = `https://opentdb.com/api.php?amount=${custom_URL.amount}&type=multiple${custom_URL.category ? `&category=${custom_URL.category}` : ""}${custom_URL.difficulty ? `&difficulty=${custom_URL.difficulty}` : ""}`
        console.log(API_URL);
    }
    await axios.get(API_URL)
        .then(res => {
            questions = [...res.data.results.map(loadedQuestion => {
                const formattedQuestion = {
                    id: nanoid(),
                    isAnswered: false,
                    question: decodeHTMLCharacterCodes(loadedQuestion.question)
                };
                const answerChoices = [...loadedQuestion.incorrect_answers].map(option => decodeHTMLCharacterCodes(option));
                formattedQuestion.answer = decodeHTMLCharacterCodes(loadedQuestion.correct_answer);
                answerChoices.splice(Math.floor(Math.random() * 10) % 4, 0, decodeHTMLCharacterCodes(loadedQuestion.correct_answer));
                formattedQuestion.options = answerChoices;
                return formattedQuestion;
            })]
        })
        .catch(err => {
            console.error(err);
        })
}

