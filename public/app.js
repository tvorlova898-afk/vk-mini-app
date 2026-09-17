"use strict";


/*
    ============================================================
    НАСТРОЙКА ССЫЛКИ
    ============================================================

    ПОКА НИЧЕГО НЕ МЕНЯЙ.

    Когда Mini App заработает, сюда поставим ссылку
    на твою VK-группу.
*/

const COMMUNITY_URL = "https://vk.com/";


/*
    ============================================================
    СОСТОЯНИЕ ПРИЛОЖЕНИЯ
    ============================================================
*/

const state = {
    step: 1,

    product: null,

    goal: null,

    resources: null
};


/*
    ============================================================
    ВАРИАНТЫ
    ============================================================
*/

const products = [

    {
        id: "services",

        title: "Услуги",

        description:
            "Консультации, сопровождение, работа один на один или под заказ"
    },

    {
        id: "products",

        title: "Товары",

        description:
            "Физические или цифровые продукты"
    },

    {
        id: "education",

        title: "Обучение",

        description:
            "Курсы, программы, наставничество, клубы"
    }

];


const goals = [

    {
        id: "sales",

        title: "Быстрые продажи",

        description:
            "Хочу быстрее переводить интерес в покупку"
    },

    {
        id: "warmup",

        title: "Прогрев",

        description:
            "Хочу постепенно подводить человека к решению"
    },

    {
        id: "reactivation",

        title: "Вернуть базу",

        description:
            "У меня есть люди, которые давно молчат"
    }

];


const resources = [

    {
        id: "minimum",

        title: "Минимум ресурсов",

        description:
            "Хочу запустить быстро и без сложной конструкции"
    },

    {
        id: "medium",

        title: "Средне",

        description:
            "Готова вложиться в механику, если она полезна"
    },

    {
        id: "maximum",

        title: "Максимум",

        description:
            "Хочу полноценный инструмент внутри продаж"
    }

];


/*
    ============================================================
    РЕЗУЛЬТАТЫ
    ============================================================
*/

const results = {


    /*
        УСЛУГИ
    */

    "services-sales-minimum": {

        name: "Калькулятор стоимости",

        description:
            "Дайте человеку несколько параметров и покажите ориентир стоимости или подходящий формат работы. Это снимает часть вопросов ещё до личного общения."

    },


    "services-sales-medium": {

        name: "Подбор решения",

        description:
            "Мини-диагностика из нескольких вопросов, после которой человек получает подходящий формат вашей услуги. Это уже не просто квиз, а предварительная квалификация клиента."

    },


    "services-sales-maximum": {

        name: "Интерактивный диагност",

        description:
            "Диагностика → персональный результат → объяснение проблемы → следующий шаг. Такой инструмент может заменить часть первичной консультации."

    },


    "services-warmup-minimum": {

        name: "Тест «Что вам мешает?»",

        description:
            "Небольшой тест помогает человеку самому сформулировать проблему, а вам — продолжить разговор уже с понятным контекстом."

    },


    "services-warmup-medium": {

        name: "Персональный маршрут",

        description:
            "Человек отвечает на несколько вопросов и получает следующий шаг: что проверить, изменить или сделать в первую очередь."

    },


    "services-warmup-maximum": {

        name: "Интерактивная консультация",

        description:
            "Диагностика, рекомендации и несколько веток развития ситуации в одном инструменте. Пользователь получает пользу ещё до разговора с вами."

    },


    "services-reactivation-minimum": {

        name: "Повод вернуться",

        description:
            "Сделайте короткий тест или выбор сценария, который интересно пройти даже тем, кто давно не отвечал."

    },


    "services-reactivation-medium": {

        name: "Повторная диагностика",

        description:
            "Предложите бывшим лидам проверить, что изменилось у них за последнее время, и получить новый персональный результат."

    },


    "services-reactivation-maximum": {

        name: "Персональный аудит",

        description:
            "Интерактивный аудит возвращает человека в диалог и одновременно показывает вашу экспертность."

    },


    /*
        ТОВАРЫ
    */

    "products-sales-minimum": {

        name: "Подбор товара",

        description:
            "Несколько вопросов вместо каталога на 100 экранов: человек отвечает, а вы показываете ему подходящие варианты."

    },


    "products-sales-medium": {

        name: "Конструктор выбора",

        description:
            "Дайте человеку собрать подходящий вариант из нескольких параметров. Понятная логика выбора уменьшает сомнения перед покупкой."

    },


    "products-sales-maximum": {

        name: "Интерактивный консультант",

        description:
            "Инструмент проводит человека от задачи до конкретного товара или комплекта и подводит к покупке."

    },


    "products-warmup-minimum": {

        name: "Тест-подбор",

        description:
            "Человек проходит небольшой тест и получает подходящий продукт плюс объяснение, почему именно он."

    },


    "products-warmup-medium": {

        name: "Гид по выбору",

        description:
            "Вместо прямой продажи помогите человеку разобраться в вариантах. В конце — персональная рекомендация."

    },


    "products-warmup-maximum": {

        name: "Интерактивный эксперт",

        description:
            "Соберите экспертную логику продавца в интерфейсе: вопросы, сравнение, рекомендации и следующий шаг."

    },


    "products-reactivation-minimum": {

        name: "Обновлённый подбор",

        description:
            "Верните старую аудиторию новым инструментом: пусть человек заново подберёт товар под свою текущую задачу."

    },


    "products-reactivation-medium": {

        name: "Что вам подходит сейчас?",

        description:
            "Несколько новых вопросов — и человек получает актуальную рекомендацию вместо обычного рекламного сообщения."

    },


    "products-reactivation-maximum": {

        name: "Персональный пересмотр",

        description:
            "Интерактивный подбор может одновременно реактивировать базу, собирать данные о запросах и вести к конкретным товарам."

    },


    /*
        ОБУЧЕНИЕ
    */

    "education-sales-minimum": {

        name: "Мини-тест перед покупкой",

        description:
            "Помогите человеку понять, подходит ли ему ваш продукт и с какого уровня лучше начать."

    },


    "education-sales-medium": {

        name: "Диагностика готовности",

        description:
            "Несколько вопросов показывают текущую точку человека и подводят к программе, которая закрывает именно этот разрыв."

    },


    "education-sales-maximum": {

        name: "Подбор программы",

        description:
            "Диагностика, сегментация и рекомендация в одном инструменте. На выходе человек получает конкретный маршрут обучения."

    },


    "education-warmup-minimum": {

        name: "Тест «Где вы сейчас?»",

        description:
            "Короткий тест помогает человеку увидеть свою точку А и понять, чего ему не хватает для следующего шага."

    },


    "education-warmup-medium": {

        name: "Карта точки А → точки Б",

        description:
            "После нескольких вопросов человек получает персональный маршрут и видит, какой результат может дать обучение."

    },


    "education-warmup-maximum": {

        name: "Интерактивная диагностика",

        description:
            "Глубокая диагностика показывает ситуацию пользователя, формирует рекомендацию и естественно ведёт к вашей программе."

    },


    "education-reactivation-minimum": {

        name: "Повторная самодиагностика",

        description:
            "Верните старых подписчиков вопросом «Что изменилось у вас за это время?» и дайте им новый персональный результат."

    },


    "education-reactivation-medium": {

        name: "Проверка прогресса",

        description:
            "Дайте человеку сравнить себя с прежней точкой. Это хороший повод вернуться к теме обучения без прямой продажи."

    },


    "education-reactivation-maximum": {

        name: "Персональный образовательный маршрут",

        description:
            "Интерактив показывает текущую ситуацию, пробелы и следующий шаг. Такой инструмент можно использовать повторно для разных сегментов."

    }

};


/*
    ============================================================
    VK BRIDGE
    ============================================================
*/

function initVK() {

    if (typeof vkBridge === "undefined") {

        console.log("VK Bridge не найден. Работаем в браузерном режиме.");

        return;
    }


    vkBridge
        .send("VKWebAppInit")
        .then(() => {

            console.log("VK Mini App успешно инициализирован.");

        })
        .catch((error) => {

            console.log(
                "VK Bridge initialization error:",
                error
            );

        });

}


/*
    ============================================================
    СЧЁТЧИК ШАГОВ
    ============================================================
*/

function updateStepCounter(text) {

    const element =
        document.getElementById("stepCounter");


    if (element) {

        element.textContent = text;

    }

}


/*
    ============================================================
    РЕНДЕР
    ============================================================
*/

function render() {

    const screen =
        document.getElementById("screen");


    if (!screen) {

        return;

    }


    if (state.step === 1) {

        renderProductStep();

        return;

    }


    if (state.step === 2) {

        renderGoalStep();

        return;

    }


    if (state.step === 3) {

        renderResourcesStep();

        return;

    }


    if (state.step === 4) {

        renderResult();

        return;

    }

}


/*
    ============================================================
    ШАГ 1
    ============================================================
*/

function renderProductStep() {

    updateStepCounter("1 / 3");


    const screen =
        document.getElementById("screen");


    screen.innerHTML = `

        <div class="badge">
            ИНТЕРАКТИВНЫЙ ЛИД-МАГНИТ
        </div>


        <h1>
            Что вам<br>
            на самом деле нужно?
        </h1>


        <p class="description">
            Ответьте на три вопроса — и получите механику,
            которую можно использовать для привлечения,
            прогрева или возврата клиентов.
        </p>


        <div class="options">

            ${products.map(createProductButton).join("")}

        </div>

    `;


    document
        .querySelectorAll("[data-product]")
        .forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    state.product =
                        button.dataset.product;

                    state.step = 2;

                    render();

                }
            );

        });

}


/*
    ============================================================
    ШАГ 2
    ============================================================
*/

function renderGoalStep() {

    updateStepCounter("2 / 3");


    const screen =
        document.getElementById("screen");


    screen.innerHTML = `

        <div class="progress">

            <div
                class="progress-inner"
                style="width: 66%"
            ></div>

        </div>


        <h2>
            А чего вы хотите добиться?
        </h2>


        <p class="description">
            От цели зависит сама механика.
            Один и тот же продукт можно продавать
            совершенно разными сценариями.
        </p>


        <div class="options">

            ${goals.map(createGoalButton).join("")}

        </div>


        <button
            class="back-button"
            id="backButton"
        >
            ← Назад
        </button>

    `;


    document
        .querySelectorAll("[data-goal]")
        .forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    state.goal =
                        button.dataset.goal;

                    state.step = 3;

                    render();

                }
            );

        });


    document
        .getElementById("backButton")
        .addEventListener(
            "click",
            () => {

                state.step = 1;

                render();

            }
        );

}


/*
    ============================================================
    ШАГ 3
    ============================================================
*/

function renderResourcesStep() {

    updateStepCounter("3 / 3");


    const screen =
        document.getElementById("screen");


    screen.innerHTML = `

        <div class="progress">

            <div
                class="progress-inner"
                style="width: 100%"
            ></div>

        </div>


        <h2>
            Сколько ресурсов готовы вложить?
        </h2>


        <p class="description">
            Не обязательно начинать с огромной конструкции.
            Выберите реальный уровень ресурсов.
        </p>


        <div class="options">

            ${resources
                .map(createResourceButton)
                .join("")}

        </div>


        <button
            class="back-button"
            id="backButton"
        >
            ← Назад
        </button>

    `;


    document
        .querySelectorAll("[data-resource]")
        .forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    state.resources =
                        button.dataset.resource;

                    state.step = 4;

                    render();

                }
            );

        });


    document
        .getElementById("backButton")
        .addEventListener(
            "click",
            () => {

                state.step = 2;

                render();

            }
        );

}


/*
    ============================================================
    РЕЗУЛЬТАТ
    ============================================================
*/

function renderResult() {

    updateStepCounter("ГОТОВО");


    const key =
        `${state.product}-${state.goal}-${state.resources}`;


    const result =
        results[key];


    const screen =
        document.getElementById("screen");


    if (!result) {

        screen.innerHTML = `

            <div class="badge">
                ОШИБКА РЕЗУЛЬТАТА
            </div>

            <h2>
                Не удалось определить результат.
            </h2>

            <p class="description">
                Попробуйте пройти тест ещё раз.
            </p>

            <button
                class="primary-button"
                id="restartButton"
            >
                Пройти заново
            </button>

        `;


        document
            .getElementById("restartButton")
            .addEventListener(
                "click",
                restart
            );


        return;

    }


    screen.innerHTML = `

        <div class="badge">
            ВАШ РЕЗУЛЬТАТ
        </div>


        <h2>
            Вот что можно попробовать первым.
        </h2>


        <div class="result-card">

            <div class="result-label">
                Рекомендуемая механика
            </div>


            <div class="result-name">
                ${result.name}
            </div>


            <div class="result-description">
                ${result.description}
            </div>

        </div>


        <button
            class="primary-button"
            id="discussButton"
        >
            Обсудить реализацию
        </button>


        <button
            class="secondary-button"
            id="restartButton"
        >
            Пройти заново
        </button>


        <p class="note">
            Это не готовый шаблон. Механику можно
            адаптировать под ваш продукт, аудиторию
            и текущую воронку.
        </p>

    `;


    document
        .getElementById("restartButton")
        .addEventListener(
            "click",
            restart
        );


    document
        .getElementById("discussButton")
        .addEventListener(
            "click",
            openCommunity
        );

}


/*
    ============================================================
    СОЗДАНИЕ КНОПОК
    ============================================================
*/

function createProductButton(item) {

    return `

        <button
            class="option"
            data-product="${item.id}"
        >

            <span class="option-title">
                ${item.title}
            </span>

            <span class="option-description">
                ${item.description}
            </span>

        </button>

    `;

}


function createGoalButton(item) {

    return `

        <button
            class="option"
            data-goal="${item.id}"
        >

            <span class="option-title">
                ${item.title}
            </span>

            <span class="option-description">
                ${item.description}
            </span>

        </button>

    `;

}


function createResourceButton(item) {

    return `

        <button
            class="option"
            data-resource="${item.id}"
        >

            <span class="option-title">
                ${item.title}
            </span>

            <span class="option-description">
                ${item.description}
            </span>

        </button>

    `;

}


/*
    ============================================================
    НАЧАТЬ ЗАНОВО
    ============================================================
*/

function restart() {

    state.step = 1;

    state.product = null;

    state.goal = null;

    state.resources = null;

    render();

}


/*
    ============================================================
    КНОПКА "ОБСУДИТЬ РЕАЛИЗАЦИЮ"
    ============================================================
*/

function openCommunity() {

    if (
        !COMMUNITY_URL ||
        COMMUNITY_URL === "https://vk.com/"
    ) {

        alert(
            "Ссылка на VK-группу пока не настроена."
        );

        return;

    }


    if (
        typeof vkBridge !== "undefined"
    ) {

        vkBridge
            .send(
                "VKWebAppOpenURL",
                {
                    url: COMMUNITY_URL
                }
            )
            .catch(
                () => {

                    window.open(
                        COMMUNITY_URL,
                        "_blank"
                    );

                }
            );

    } else {

        window.open(
            COMMUNITY_URL,
            "_blank"
        );

    }

}


/*
    ============================================================
    ЗАПУСК
    ============================================================
*/

initVK();

render();
