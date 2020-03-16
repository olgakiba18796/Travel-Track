# Travel-Track

Web-based geolocation travel places tracker

### Installing

after clone create .env file in the folder backend with

```
MONGO_DB_URI=**your mongodb URI with username and password**
REACT_APP_GOOGLE_MAP_URI=/https://maps.googleapis.com/maps/api/js?key=** YOUR KEY **&v=3.exp&libraries=geometry,drawing,place
```

for root, backend and frontend

```
npm install
```

### Running

in frontend and backend folders

```
yarn start
```

Web app will be available on http://localhost:3000/ by default

### Using example
![Example](https://github.com/olgakiba18796/Travel-Track/blob/master/readme-assets/example.gif)

### Functionality

- Registration and login
- User profile creation and editing
- Geolocation detection and search places, which you have visited on the map
- Сheck and delete chosen places on Home page

### Next steps

- transfer photos to Home page
- adding a public page to share places with friends
- adding chat rooms

### На русском языке

Приложение для поиска людей с одинаковыми интересами на основе геолокации.

### Функциональность

- Регистрация и вход в систему
- Создание и редактирование профилей пользователей
- Обнаружение текущей геолокации и поиск мест, которые вы посетили или хотели бы посетить
- Редактирование и удаление отмеченных мест на домашней странице

### В планах

- отображение фотографий в чате
- добавление публичной страницы, чтобы делиться посещенными местами с друзьми
- добавление чата
