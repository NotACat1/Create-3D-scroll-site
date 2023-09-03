# 3D Scroll

![main](https://github.com/NotACat1/Create-3D-scroll-site/assets/113008873/f7ec5594-0171-4fdb-b3c8-72a3f99220d4)

## О проекте

[3D Scroll](https://notacat1.github.io/Create-3D-scroll-site/) - Этот веб-сайт предлагает необычное решение для навигации, заменяя стандартный скролл вверх-вниз на движение вглубь страницы. Этот инновационный подход создает уникальный и интересный опыт взаимодействия с веб-сайтом, позволяя пользователям исследовать контент, двигаясь вглубь страницы, вместо традиционного вертикального скролла.

Идея взята с видеоурока: [https://youtu.be/zKjYfxei5vc](https://youtu.be/GLbI7BGdQ3o?si=dEGCgLyQ2or02-ga).

## Реализованный функционал

### 1. Скролл в глубину

Глубокий скролл - это увлекательное и нестандартное решение для сайта, которое открывает новые горизонты в интерактивном взаимодействии с контентом. Вместо традиционного вертикального скролла, этот подход позволяет пользователям исследовать веб-страницу, двигаясь вглубь контента, создавая ощущение увлекательного приключения. Это превращает посещение сайта в уникальный и захватывающий опыт, который оставляет яркие впечатления и позволяет более глубоко погрузиться в информацию и визуальные элементы.

```js
arrFrames.forEach((frame, index) => {
  zVals.push(index * spaceZ);
  frame.setAttribute('style', `transform: translateZ(${zVals[index]}px)`);
});

body.setAttribute('style', `height: ${Math.abs(spaceZ) * (arrFrames.length)}px`);

window.onscroll = function () {
  const top = document.documentElement.scrollTop;
	const delta = lastPos - top;
	lastPos = top;
  arrFrames.forEach((frame, index) => {
    zVals[index] -= delta;
    frame.setAttribute('style', `transform: translateZ(${zVals[index]}px); opacity: ${zVals[index] < Math.abs(spaceZ) / 2? 1: 0}`);
  });
};
```

### 2. Аудиосопровождение

Аудиосопровождение дополняет контент приятной и ненавязчивой музыкой, создавая более гармоничный и увлекательный пользовательский опыт. Эта музыкальная атмосфера может улучшить восприятие контента, усилить эмоциональное воздействие и сделать визит на сайт более запоминающимся.

```js
btnAudio.addEventListener('click', (evt) => {
  btnAudio.classList.toggle(selectors.soundbutton.paused);
	audioFrame.paused? audioFrame.play(): audioFrame.pause();
});
```

### 3. Автоматическое включение и выключение аудио

Если пользователь покинет сайт, не закрывая вкладку, то аудио автоматически остановится, и оно будет включаться лишь по возвращению пользователя. Это обеспечивает более комфортное взаимодействие, позволяя пользователям контролировать аудио и предотвращая его проигрывание, когда они временно покидают сайт.

```js
window.onfocus = function () {
	btnAudio.classList.contains(selectors.soundbutton.paused)? audioFrame.pause(): audioFrame.play();
};

window.onblur = function () {
	audioFrame.pause();
};
```

## Используемые технологии

### 1. Normalize.css

[Normalize.css](https://necolas.github.io/normalize.css/) предоставляет браузерам возможность более последовательного отображения всех элементов согласно современным стандартам. Он акцентируется на нормализации только тех стилей, которые действительно требуют коррекции.

```css
/* index.css */
@import url(../vendor/normalize.css);
```

### 2. Webpack

[Webpack](https://webpack.js.org/) - это инструмент с открытым исходным кодом для сборки веб-приложений. Он позволяет объединять различные файлы, такие как HTML, CSS, JavaScript, изображения, в единый пакет для оптимизированной доставки на веб-сервер. Webpack также поддерживает использование различных загрузчиков и плагинов, что облегчает процесс разработки, минимизации и управления зависимостями.

Настройки Webpack:

```js
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: './src/pages/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '',
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    open: true,
    compress: true,
    port: 8080
  },
  module: {
    rules: [{
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset/resource',
        generator: {
            filename: 'images/[name].[hash][ext]',
          }
      },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
      generator: {
            filename: 'fonts/[name].[hash][ext]',
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),

  ]
}
```

#### 2.1 Babel

[Babel](https://babeljs.io/) - это инструмент для транспиляции кода на JavaScript. Он позволяет разработчикам писать код, используя современные функции языка, которые могут быть не поддержаны всеми браузерами. Babel преобразует этот код в совместимый с более старыми версиями браузеров, обеспечивая кросс-браузерную поддержку и совместимость.

Настройки Babel:

```js
// babel.config.js
const presets = [
  ['@babel/preset-env', {
    targets: {
      edge: '17',
      ie: '11',
      firefox: '50',
      chrome: '64',
      safari: '11.1'
    },
    useBuiltIns: "entry"
  }]
];
module.exports = { presets };
```

#### 2.2 PostCSS

[PostCSS](https://postcss.org/) - это инструмент для обработки и трансформации кода CSS. Он позволяет разработчикам применять различные плагины к CSS коду, автоматизируя задачи, такие как автопрефиксинг, оптимизация, генерация переменных и многое другое. PostCSS гибкий и настраиваемый, что позволяет адаптировать его под конкретные потребности проекта.

Настройки PostCSS:

```js
// postcss.config.js
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
module.exports = {
  plugins: [
    autoprefixer,
    cssnano({ preset: 'default' })
  ]
};
```
