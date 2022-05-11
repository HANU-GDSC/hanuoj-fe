import languages from "../assets/common/languages.json";
import store from "../store/index";

/**
 * input là một chuỗi, output trả về chuỗi đã dịch.
 * Nếu không có dữ liệu trong file language.json thì trả về nguyên bản.
 * mặc định input là tiếng anh, thay đổi ngôn ngữ đầu vào thì dùng param thứ 2, truyền vào ngôn ngữ ("en", "vi")
 * muốn dùng custom language thì truyền param thứ nhất 1 object theo định dạng sau:
 * {
 *  en: "something",
 *  vi: "một thứ gì đó"
 * }
 * 
 */
export default function (input, language) {
    if (!input)
        return "";

    let inputLanguage = language || "en";
    let currentLanguage = store.state.general.language;
    let translated = input;

    // object case
    if (typeof input === "object") {
        translated = input[currentLanguage];
    }

    // string case
    if (typeof input === "string") {
        let isUpperCase, firstLetterIsUpperCase;
        if (input === input.toUpperCase())
            isUpperCase = true;
        if (input[0] === input[0].toUpperCase())
            firstLetterIsUpperCase = true;
        for (let key in languages) {
            if (languages[key][inputLanguage] === input.toLowerCase()) {
                translated = languages[key][currentLanguage];
                break;
            }
        }
        if (isUpperCase)
            translated = translated.toUpperCase();
        if (firstLetterIsUpperCase)
            translated = translated[0].toUpperCase() + translated.slice(1);
    }
    return translated;
}