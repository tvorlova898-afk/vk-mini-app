// ============================================================
// VK MINI APP
// Основная логика приложения
//
// Все основные настройки находятся в config.js.
// ============================================================


// ============================================================
// СОСТОЯНИЕ ПРИЛОЖЕНИЯ
// ============================================================

let state = {
    step: 1,
    product: null,
    goal: null,
    resources: null
};


// ============================================================
// ЭЛЕМЕНТЫ СТРАНИЦЫ
// ============================================================

const screen = document.getElementById("screen");
const stepCounter = document.getElementById("stepCounter");
const brandElement = document.getElementById("brand");


// ============================================================
// ИНИЦИАЛИЗАЦИЯ VK
//
// Важно:
// приложение должно работать и внутри VK,
// и при обычном открытии GitHub Pages.
//
// Поэтому VK Bridge не должен блокировать запуск приложения.
// ============================================================

async function initVK() {

    try {

        if (
            window.vkBridge &&
            typeof window.vkBridge.send === "function"
        ) {

            await Promise.race([

                window.vkBridge.send("VKWebAppInit"),

                new Promise(resolve => {
                    setTimeout(resolve, 1000);
                })

            ]);

        }

    } catch (error) {

        console.log(
            "VK Bridge initialization:",
            error
        );

    }

}


// ============================================================
// БРЕНД
// ============================================================

function renderBrand() {

    if (
        brandElement &&
        typeof CONFIG !== "undefined" &&
        CONFIG.brand
    ) {

        brandElement.textContent = CONFIG.brand;

    }

}


// ============================================================
// СЧЁТЧИК ШАГОВ
// ============================================================

function updateStepCounter() {

    if (!stepCounter) {
        return;
    }

    if (state.step <= 3) {

        stepCounter.textContent =
            `${state.step} / 3`;

    } else {

        stepCounter.textContent = "";

    }

}


// ============================================================
// ПЕРЕЗАПУСК CSS-АНИМАЦИИ
// ============================================================

function restartAnimation() {

    if (!screen) {
        return;
    }

    screen.style.animation = "none";

    void screen.offsetWidth;

    screen.style.animation = "";

}


// ============================================================
// ОТРИСОВКА ЭКРАНА
// ============================================================

function render(html) {

    if (!screen) {

        console.error(
            "Ошибка: элемент #screen не найден."
        );

        return;
    }

    screen.innerHTML = html;

    restartAnimation();

    updateStepCounter();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ============================================================
// СОЗДАНИЕ ВАРИАНТА ОТВЕТА
// ============================================================

function createOption(item) {

    return `
        <button
            class="option"
            type="button"
            data-id="${item.id}"
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


// ============================================================
// ПОДКЛЮЧЕНИЕ ОБРАБОТЧИКОВ КНОПОК
// ============================================================

function attachOptionHandlers(handler) {

    document
        .querySelectorAll(".option")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        button.dataset.id;

                    handler(id);

                }
            );

        });

}


// ============================================================
// ГЛАВНЫЙ ЭКРАН
// ============================================================

function renderStart() {

    state.step = 1;

    state.product = null;
    state.goal = null;
    state.resources = null;

    render(`

        <div class="badge">
            ИНТЕРАКТИВНЫЙ ДИАГНОСТИЧЕСКИЙ ТЕСТ
        </div>

        <h1>
            ${CONFIG.title}
        </h1>

        <p class="description">
            ${CONFIG.subtitle}
        </p>

        <button
            class="primary-button"
            id="startButton"
            type="button"
        >
            Начать
        </button>

        <div class="note">
            Всего 3 вопроса. В конце вы получите персональную рекомендацию.
        </div>

    `);


    const startButton =
        document.getElementById("startButton");


    if (startButton) {

        startButton.addEventListener(
            "click",
            () => {

                state.step = 1;

                renderProductQuestion();

            }
        );

    }

}


// ============================================================
// ВОПРОС 1
// ============================================================

function renderProductQuestion() {

    state.step = 1;

    const options = CONFIG.products
        .map(item => createOption(item))
        .join("");


    render(`

        <div class="progress">

            <div
                class="progress-inner"
                style="width: 33.33%"
            ></div>

        </div>

        <div class="badge">
            ВОПРОС 1
        </div>

        <h2>
            Что вы продаёте?
        </h2>

        <p class="description">
            Выберите вариант, который ближе всего к вашей модели бизнеса.
        </p>

        <div class="options">
            ${options}
        </div>

    `);


    attachOptionHandlers(
        productId => {

            state.product = productId;

            renderGoalQuestion();

        }
    );

}


// ============================================================
// ВОПРОС 2
// ============================================================

function renderGoalQuestion() {

    state.step = 2;

    const options = CONFIG.goals
        .map(item => createOption(item))
        .join("");


    render(`

        <div class="progress">

            <div
                class="progress-inner"
                style="width: 66.66%"
            ></div>

        </div>

        <div class="badge">
            ВОПРОС 2
        </div>

        <h2>
            Что сейчас важнее всего?
        </h2>

        <p class="description">
            Выберите главную задачу, которую хотите решить.
        </p>

        <div class="options">
            ${options}
        </div>

        <button
            class="back-button"
            id="backButton"
            type="button"
        >
            ← Назад
        </button>

    `);


    attachOptionHandlers(
        goalId => {

            state.goal = goalId;

            renderResourcesQuestion();

        }
    );


    const backButton =
        document.getElementById("backButton");


    if (backButton) {

        backButton.addEventListener(
            "click",
            () => {

                renderProductQuestion();

            }
        );

    }

}


// ============================================================
// ВОПРОС 3
// ============================================================

function renderResourcesQuestion() {

    state.step = 3;

    const options = CONFIG.resources
        .map(item => createOption(item))
        .join("");


    render(`

        <div class="progress">

            <div
                class="progress-inner"
                style="width: 100%"
            ></div>

        </div>

        <div class="badge">
            ВОПРОС 3
        </div>

        <h2>
            Сколько ресурсов готовы вложить?
        </h2>

        <p class="description">
            Не только деньги — учитываем также время и готовность разбираться с системой.
        </p>

        <div class="options">
            ${options}
        </div>

        <button
            class="back-button"
            id="backButton"
            type="button"
        >
            ← Назад
        </button>

    `);


    attachOptionHandlers(
        resourceId => {

            state.resources = resourceId;

            renderResult();

        }
    );


    const backButton =
        document.getElementById("backButton");


    if (backButton) {

        backButton.addEventListener(
            "click",
            () => {

                renderGoalQuestion();

            }
        );

    }

}


// ============================================================
// КЛЮЧ РЕЗУЛЬТАТА
// ============================================================

function getResultKey() {

    return [
        state.product,
        state.goal,
        state.resources
    ].join("_");

}


// ============================================================
// ПОЛУЧЕНИЕ РЕЗУЛЬТАТА
// ============================================================

function getResult() {

    const key =
        getResultKey();

    return (
        RESULTS[key] ||
        RESULTS.default
    );

}


// ============================================================
// ЭКРАН РЕЗУЛЬТАТА
// ============================================================

function renderResult() {

    state.step = 4;

    const result =
        getResult();


    render(`

        <div class="badge">
            ВАШ РЕЗУЛЬТАТ
        </div>

        <h2>
            Вот что вам сейчас действительно нужно
        </h2>

        <div class="result-card">

            <div class="result-label">
                РЕКОМЕНДАЦИЯ
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
            id="communityButton"
            type="button"
        >
            ${CONFIG.resultButtonText}
        </button>

        <button
            class="secondary-button"
            id="restartButton"
            type="button"
        >
            ${CONFIG.restartButtonText}
        </button>

        <div class="note">
            Результат сформирован на основе ваших ответов.
            Это не универсальный рецепт, а отправная точка
            для выбора механики.
        </div>

    `);


    const communityButton =
        document.getElementById(
            "communityButton"
        );


    if (communityButton) {

        communityButton.addEventListener(
            "click",
            openCommunity
        );

    }


    const restartButton =
        document.getElementById(
            "restartButton"
        );


    if (restartButton) {

        restartButton.addEventListener(
            "click",
            renderStart
        );

    }

}


// ============================================================
// ПЕРЕХОД В СООБЩЕСТВО
// ============================================================

async function openCommunity() {

    const url =
        CONFIG.communityUrl;


    if (!url) {

        console.error(
            "CONFIG.communityUrl не задан."
        );

        return;

    }


    try {

        if (
            window.vkBridge &&
            typeof window.vkBridge.send === "function"
        ) {

            await window.vkBridge.send(
                "VKWebAppOpenURL",
                {
                    url: url
                }
            );

            return;

        }

    } catch (error) {

        console.log(
            "VK OpenURL error:",
            error
        );

    }


    // Если приложение открыто
    // не внутри VK — обычное открытие ссылки.

    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


// ============================================================
// РЕЗУЛЬТАТЫ
// ============================================================
//
// Ключ строится так:
//
// product_goal_resources
//
// Например:
//
// services_sales_minimum
//
// ============================================================

const RESULTS = {

    // --------------------------------------------------------
    // УСЛУГИ
    // --------------------------------------------------------

    services_sales_minimum: {
        name: "Простой лид-магнит",
        description:
            "Начните с простой механики, которая помогает человеку сделать следующий шаг: мини-тест, чек-лист или короткая диагностика. Сейчас вам важнее не усложнять систему, а проверить, какая механика действительно приводит к обращению."
    },

    services_sales_medium: {
        name: "Интерактивная воронка",
        description:
            "Вам подойдёт интерактивная механика, которая не просто собирает контакт, а помогает человеку понять свою ситуацию и одновременно подводит его к вашему предложению."
    },

    services_sales_maximum: {
        name: "Персонализированный помощник",
        description:
            "При ваших ресурсах можно собрать полноценный путь клиента: диагностика → персональный результат → предложение → следующий шаг. Здесь уже имеет смысл подключать автоматизацию и AI."
    },


    services_warmup_minimum: {
        name: "Мини-диагностика",
        description:
            "Вместо длинного прогрева попробуйте дать человеку возможность быстро определить свою ситуацию. Это создаёт полезный первый контакт без сложной технической реализации."
    },

    services_warmup_medium: {
        name: "Интерактивный прогрев",
        description:
            "Вам подойдёт механика, которая постепенно показывает человеку проблему, помогает узнать себя в ситуации и приводит к вашему решению."
    },

    services_warmup_maximum: {
        name: "Персональный маршрут",
        description:
            "Можно построить полноценный путь прогрева с сегментацией, персональными результатами и разными сценариями дальнейшего взаимодействия."
    },


    services_reactivation_minimum: {
        name: "Повторное касание",
        description:
            "Начните с простой механики, которая даст старой базе повод снова вступить с вами в контакт: тест, вопрос, мини-диагностика или полезный материал."
    },

    services_reactivation_medium: {
        name: "Интерактив для базы",
        description:
            "Вам подойдёт механика, которая не просто напоминает о вас, а заставляет человека сделать небольшое действие и получить персональную пользу."
    },

    services_reactivation_maximum: {
        name: "Система реактивации",
        description:
            "При достаточных ресурсах можно сегментировать базу и вести разные группы людей по разным сценариям возвращения."
    },


    // --------------------------------------------------------
    // ТОВАРЫ
    // --------------------------------------------------------

    products_sales_minimum: {
        name: "Подбор товара",
        description:
            "Для быстрого старта подойдёт простой тест или подборщик, который помогает человеку выбрать подходящий товар и сокращает путь до покупки."
    },

    products_sales_medium: {
        name: "Интерактивный подборщик",
        description:
            "Соберите несколько вопросов и выдавайте человеку подходящий товар или набор товаров. Такая механика помогает снять сомнения и одновременно показывает ценность вашего предложения."
    },

    products_sales_maximum: {
        name: "Персональный консультант",
        description:
            "При больших ресурсах можно создать полноценного цифрового помощника, который выясняет потребность, предлагает подходящие варианты и сопровождает человека до покупки."
    },


    products_warmup_minimum: {
        name: "Тест интереса",
        description:
            "Начните с лёгкой интерактивной механики, которая помогает человеку понять собственную потребность и познакомиться с вашим продуктом."
    },

    products_warmup_medium: {
        name: "Интерактивный прогрев",
        description:
            "Вам подойдёт цепочка вопросов и персональный результат, который показывает человеку, почему конкретный продукт может быть ему полезен."
    },

    products_warmup_maximum: {
        name: "Персональная рекомендация",
        description:
            "Можно построить полноценную систему выбора: диагностика → сегментация → персональная рекомендация → контент → предложение."
    },


    products_reactivation_minimum: {
        name: "Повторный подбор",
        description:
            "Дайте бывшим клиентам простой повод вернуться: новый подбор товара, тест или персональная рекомендация."
    },

    products_reactivation_medium: {
        name: "Механика возврата",
        description:
            "Интерактивный подборщик поможет снова вовлечь базу и одновременно показать актуальные продукты."
    },

    products_reactivation_maximum: {
        name: "Персональная система",
        description:
            "Можно сегментировать базу по потребностям и запускать разные сценарии возвращения клиентов."
    },


    // --------------------------------------------------------
    // ОБУЧЕНИЕ
    // --------------------------------------------------------

    education_sales_minimum: {
        name: "Диагностический тест",
        description:
            "Для быстрого старта подойдёт тест, который помогает человеку увидеть свой запрос и понять, какой ваш продукт ему подходит."
    },

    education_sales_medium: {
        name: "Интерактивная диагностика",
        description:
            "Вам подойдёт механика, которая определяет ситуацию человека и выдаёт ему персональную рекомендацию по программе или формату обучения."
    },

    education_sales_maximum: {
        name: "Персональный навигатор",
        description:
            "Можно построить полноценного цифрового навигатора по вашим продуктам: диагностика → рекомендация → прогрев → предложение."
    },


    education_warmup_minimum: {
        name: "Мини-диагностика",
        description:
            "Не обязательно сразу вести человека в длинную воронку. Начните с короткой диагностики, которая помогает ему увидеть свой запрос."
    },

    education_warmup_medium: {
        name: "Интерактивный прогрев",
        description:
            "Создайте механику, в которой человек отвечает на вопросы, узнаёт себя в результате и получает следующий логичный шаг."
    },

    education_warmup_maximum: {
        name: "Персональный маршрут обучения",
        description:
            "При достаточных ресурсах можно построить систему, которая определяет точку человека и предлагает ему подходящий образовательный маршрут."
    },


    education_reactivation_minimum: {
        name: "Повторная диагностика",
        description:
            "Вернуть старую аудиторию можно через новую диагностику, тест или полезный интерактив, который даёт человеку повод снова включиться."
    },

    education_reactivation_medium: {
        name: "Интерактив для базы",
        description:
            "Создайте механику, которая помогает бывшим подписчикам или ученикам определить актуальный запрос и увидеть подходящий продукт."
    },

    education_reactivation_maximum: {
        name: "Система реактивации",
        description:
            "Можно сегментировать базу и автоматически вести разные группы людей к разным образовательным продуктам."
    },


    // --------------------------------------------------------
    // РЕЗЕРВНЫЙ РЕЗУЛЬТАТ
    // --------------------------------------------------------

    default: {
        name: "Интерактивная диагностика",
        description:
            "В вашей ситуации стоит начать с механики, которая помогает человеку разобраться в своей задаче и получает персональный результат."
    }

};


// ============================================================
// ЗАПУСК ПРИЛОЖЕНИЯ
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        // Сначала показываем бренд.
        renderBrand();

        // Затем пытаемся инициализировать VK.
        // Ошибка VK Bridge не должна блокировать приложение.
        await initVK();

        // И в любом случае запускаем интерфейс.
        renderStart();

    }
);
