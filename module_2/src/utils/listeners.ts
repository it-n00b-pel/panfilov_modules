// import {moveDown, moveLeft, moveRight, moveUp, resetGame} from '../main.ts';
//
// export const keyPressOnceTracker = () => {
//     window.addEventListener('keydown', handleKeydown, {
//         once: true,
//     });
// };
//
// const handleKeydown = (event: KeyboardEvent) => {
//     switch (event.key) {
//         case 'ArrowUp':
//             moveUp();
//             break;
//         case 'ArrowRight':
//             moveRight();
//             break;
//         case 'ArrowDown':
//             moveDown();
//             break;
//         case 'ArrowLeft':
//             moveLeft();
//             break;
//         default:
//             keyPressOnceTracker();
//             return;
//     }
//     keyPressOnceTracker();
// };
//
// let resetButtons = document.getElementsByClassName('btnAgain');
//
// // Функция-обработчик события click
// function handleClick() {
//     resetGame();
// }
//
// // Назначаем обработчик события для каждой кнопки
// for (let i = 0; i < resetButtons.length; i++) {
//     resetButtons[i].addEventListener('click', handleClick);
// }
//
// // Для управления мышкой/жестами находим где было нажатие и где отпустили/ вычисляем направление
// let startX: number, startY: number, endX: number, endY: number;
//
// document.addEventListener('mousedown', (event) => {
//     startX = event.x;
//     startY = event.y;
// });
//
// document.addEventListener('mouseup', (event) => {
//     endX = event.x;
//     endY = event.y;
//
//     let x = endX - startX;
//     let y = endY - startY;
//
//     let absX = Math.abs(x) > Math.abs(y);
//     let absY = Math.abs(y) > Math.abs(x);
//     if (x > 0 && absX) {
//         moveRight();
//     } else if (x < 0 && absX) {
//         moveLeft();
//     } else if (y > 0 && absY) {
//         moveDown();
//     } else if (y < 0 && absY) {
//         moveUp();
//     }
// });
//
// document.addEventListener('touchstart', (event) => {
//     startX = event.touches[0].pageX;
//     startY = event.touches[0].pageY;
// });
//
// document.addEventListener('touchend', (event) => {
//     endX = event.changedTouches[0].pageX;
//     endY = event.changedTouches[0].pageY;
//
//     let x = endX - startX;
//     let y = endY - startY;
//
//     let absX = Math.abs(x) > Math.abs(y);
//     let absY = Math.abs(y) > Math.abs(x);
//     if (x > 0 && absX) {
//         moveRight();
//     } else if (x < 0 && absX) {
//         moveLeft();
//     } else if (y > 0 && absY) {
//         moveDown();
//     } else if (y < 0 && absY) {
//         moveUp();
//     }
// });
//
// // Открытие списка результатов
// let listData = document.getElementsByClassName('tableData__img');
//
// // Назначаем обработчик события для кнопки открытия списка
// listData[0].addEventListener('click', (event) => {
//     let div = document.getElementsByClassName('recordList');
//     // @ts-ignore
//     div[0].style.left = '0px';
//     event.stopPropagation();
// });
//
// const div = document.getElementsByClassName('recordList');
//
// document.addEventListener('click', (e) => {
//     const withinBoundaries = e.composedPath().includes(div[0]);
//
//     if (!withinBoundaries) {
//         // @ts-ignore
//         div[0].style.left = '-330px'; // скрываем элемент тк клик был за его пределами
//     }
// });
