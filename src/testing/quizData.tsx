export type tTasks = {
    "question": string; /* вопрос задания*/
    "answer": string; /* ответ задания*/
}[]

export type tQuizzes = {
    "id": number,
    "type": "M" | "S" | "C", /* M - сопоставление, S - сортировка, C - выбор варианта */
    "title": string, /* формулировка задания */
    "tasks": tTasks,
}[]

export const quiz: tQuizzes = [
    {
        "id": 1,
        "type": "M",
        "title": "Сопоставьте компанию и её отрасль.",
        "tasks": [
            { "question": "Лукойл", "answer": "Нефть и газ" },
            { "question": "Сбер", "answer": "Банки" },
            { "question": "Норникель", "answer": "Металлургия" },
            { "question": "Росатом", "answer": "Энергетика" },
            { "question": "Магнит", "answer": "Ритейл" },
            { "question": "МТС", "answer": "Телеком" },
        ]
    },
    {
        "id": 2,
        "type": "M",
        "title": "Сопоставьте компанию и год её основания.",
        "tasks": [
            { "question": "Газпром", "answer": "1989" },
            { "question": "Сбер", "answer": "1841" },
            { "question": "Роснефть", "answer": "1993" },
            { "question": "Новатэк", "answer": "1994" },
            { "question": "КАМАЗ", "answer": "1969" },
            { "question": "АвтоВАЗ", "answer": "1966" },
        ]
    },
    {
        "id": 3,
        "type": "S",
        "title": "Расположите компании по убыванию выручки (от самой высокой к самой низкой).",
        "tasks": [
            { "question": "1 место", "answer": "Роснефть" },
            { "question": "2 место", "answer": "Лукойл" },
            { "question": "3 место", "answer": "Газпром" },
            { "question": "4 место", "answer": "Сбер" },
            { "question": "5 место", "answer": "Новатэк" },
        ]
    },
    {
        "id": 4,
        "type": "S",
        "title": "Расположите компании по возрастанию прибыли (от самой низкой к самой высокой).",
        "tasks": [
            { "question": "1 место (самая низкая)", "answer": "АвтоВАЗ" },
            { "question": "2 место", "answer": "О'Кей" },
            { "question": "3 место", "answer": "М.Видео" },
            { "question": "4 место", "answer": "Детский мир" },
            { "question": "5 место", "answer": "Русагро" },
            { "question": "6 место (самая высокая)", "answer": "Сбер" },
        ]
    },
    {
        "id": 5,
        "type": "C",
        "title": "Какие компании относятся к отрасли «Нефть и газ»? Выберите все подходящие варианты.",
        "tasks": [
            { "question": "Лукойл", "answer": "true" },
            { "question": "Газпром", "answer": "true" },
            { "question": "Роснефть", "answer": "true" },
            { "question": "Новатэк", "answer": "true" },
            { "question": "Сургутнефтегаз", "answer": "true" },
            { "question": "Татнефть", "answer": "true" },
            { "question": "Сбер", "answer": "false" },
            { "question": "Норникель", "answer": "false" },
            { "question": "Магнит", "answer": "false" },
            { "question": "МТС", "answer": "false" },
        ]
    },
    {
        "id": 6,
        "type": "C",
        "title": "Какие компании имеют выручку более 2000 млрд рублей? Выберите все подходящие варианты.",
        "tasks": [
            { "question": "Лукойл", "answer": "true" },
            { "question": "Газпром", "answer": "true" },
            { "question": "Сбер", "answer": "true" },
            { "question": "Роснефть", "answer": "true" },
            { "question": "Новатэк", "answer": "true" },
            { "question": "ВТБ", "answer": "true" },
            { "question": "Норникель", "answer": "false" },
            { "question": "Сургутнефтегаз", "answer": "false" },
            { "question": "Татнефть", "answer": "false" },
            { "question": "Росатом", "answer": "false" },
        ]
    }
]