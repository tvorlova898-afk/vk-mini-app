// ============================================================
// VK MINI APP
// Универсальная логика приложения
//
// ВАЖНО:
// Все данные и настройки находятся в config.js.
// Этот файл НЕ НУЖНО редактировать.
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
// Приложение должно работать:
// 1. внутри VK;
// 2. при обычном открытии GitHub Pages.
//
// Поэтому VK Bridge не должен блокировать запуск.
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
        CONFIG.results[key] ||
        CONFIG.results.default
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
            openPersonalMessages
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
// ПЕРЕХОД В ЛИЧНЫЕ СООБЩЕНИЯ
//
// Ссылка берётся из:
// CONFIG.personalMessagesUrl
// ============================================================

async function openPersonalMessages() {

    const url =
        CONFIG.personalMessagesUrl;


    if (!url) {

        console.error(
            "CONFIG.personalMessagesUrl не задан."
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
// ЗАПУСК ПРИЛОЖЕНИЯ
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        // Показываем бренд.
        renderBrand();

        // Пытаемся инициализировать VK.
        // Ошибка VK Bridge не блокирует приложение.
        await initVK();

        // Запускаем интерфейс.
        renderStart();

    }
);
