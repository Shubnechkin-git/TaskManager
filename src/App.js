import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import VKBridge from '@vkontakte/vk-bridge';
import '@vkontakte/vkui/dist/vkui.css';
import { View, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol, ScreenSpinner } from '@vkontakte/vkui';

import Home from './panels/Home';
import Quest from './panels/Quest';
import CreateQuest from "./panels/Quest/CreateQuest";
import Slider from './panels/Slider';
import Notification from './panels/Notification/Notification';
import Calendar from './panels/Calendar/Calendar';
import Settings from './panels/Setting/Settings';
import bridge from '@vkontakte/vk-bridge';

import axios from 'axios';

const App = () => {
	// // axios.get('/database/user/id/1')
	// axios.get('/database/user', {
	// 	params: {
	// 		id: 1
	// 	}
	// })
	// 	.then(function (response) {
	// 		console.log(response);
	// 	})
	// 	.catch(function (error) {
	// 		console.log(error);
	// 	});
	const [activePanel, setActivePanel] = useState(null);
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(null);

	const [state, setState] = useState(null);

	const callBackendAPI = async () => {
		try {
			const response = await fetch('/');

			if (!response.ok) {
				throw new Error('Ошибка запроса');
			}

			const data = await response.json();
			console.log(data);
			return data;
		} catch (error) {
			console.error('Ошибка при запросе к API:', error);
			// Обработка ошибки
		}
	};

	// получение GET маршрута с сервера Express, который соответствует GET из server.js 
	// useEffect(() => {
	// 	callBackendAPI()
	// 		.then(res => setState(res))
	// 		.catch(err => console.log(err));
	// }, [])

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	// Vk bridge start
	const [userId, setUserId] = useState(null);
	const [username, setUsername] = useState('username');
	useEffect(() => {
		// Функция для получения ID пользователя через VK Bridge
		const fetchUserId = async () => {
			try {
				const userInfo = await VKBridge.send('VKWebAppGetUserInfo');
				setUsername(userInfo.first_name);
				setUserId(userInfo.id);
				console.log(userInfo);
				axios.post('/user/create_user', {

					userInfo

				}).then((response) => {
					console.log(response);
				})
					.catch((err) => {
						console.log(err);
					});
			}
			catch (error) {
				console.error('Ошибка при получении информации о пользователе:', error);
			}
		};

		// Проверяем наличие данных в localStorage
		if (localStorage.getItem('sliderIsViewed')) {
			// Данные присутствуют в кеше
			console.log('Данные есть в кеше');
			const parsedData = JSON.parse(localStorage.getItem('sliderIsViewed'));
			console.log('Тестовые данные:', parsedData);
			if (parsedData === true) {
				setActivePanel('home');
				console.log("home");
			}
			else {
				setActivePanel('slider');
				console.log("slider");
			}
		} else {
			// Данных нет в кеше, возможно, кеш был очищен
			console.log('Данных нет в кеше');
			setActivePanel('slider');
			console.log("slider");
		}
		// Вызываем функцию при монтировании компонента
		fetchUserId();
	}, []);
	// Vk bridge end
	useEffect(() => {
		const onlineHandler = () => {
			if (JSON.parse(localStorage.getItem('sliderIsViewed')) === true && userId != null)
				setActivePanel('home'); // Установка активной панели по умолчанию при восстановлении соединения
			else
				setActivePanel('slider'); // Установка активной панели по умолчанию при восстановлении соединения
		};

		const offlineHandler = () => {
			setActivePanel(null); // Сброс активной панели при потере соединения
		};

		window.addEventListener('online', onlineHandler);
		window.addEventListener('offline', offlineHandler);

		return () => {
			window.removeEventListener('online', onlineHandler);
			window.removeEventListener('offline', offlineHandler);
		};
	}, []);

	return (
		<ConfigProvider appearance="dark">
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout popout={popout}>
						<SplitCol>
							{activePanel !== null ? (
								<View activePanel={activePanel}>
									<Slider id='slider' username={username} go={go} userId={userId} bridge={bridge} />
									<Home id='home' username={username} panel={activePanel} go={go} />
									<Quest panel={activePanel} id='quest' go={go} />
									<CreateQuest panel={activePanel} id='CreateQuest' go={go} />
									<Notification panel={activePanel} id='Notification' go={go} />
									<Calendar panel={activePanel} id='calendar' go={go} />
									<Settings panel={activePanel} id='settings' go={go} />
								</View>
							) : (
								<ScreenSpinner state="loading" />
							)
							}
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
