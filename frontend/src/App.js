import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import VKBridge from '@vkontakte/vk-bridge';
import '@vkontakte/vkui/dist/vkui.css';
import { View, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol, ScreenSpinner, Snackbar, ModalRoot, ModalPage, ModalCard, FormItem, Input } from '@vkontakte/vkui';

import Home from './panels/Home';
import Quest from './panels/Quest';
import CreateQuest from "./panels/Quest/CreateQuest";
import Slider from './panels/Slider';
import Notification from './panels/Notification/Notification';
import Calendar from './panels/Calendar/Calendar';
import Settings from './panels/Setting/Settings';
import bridge from '@vkontakte/vk-bridge';

import axios from 'axios';
import { Icon28CheckCircleOutline, Icon28ErrorCircleOutline, Icon56MoneyTransferOutline } from '@vkontakte/icons';


const App = () => {
	const [snackbar, setSnackbar] = useState(null);
	// axios.get('/database/user/id/1')
	// axios.get('/user', {
	// 	params: {
	// 		id: 16
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

	const go = (e, k = 0) => {
		if (k == 0)
			setActivePanel(e.currentTarget.dataset.to);
		else
			setActivePanel(e);
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
				// axios.post('user/create_user', {
				axios.post('https://192.168.0.108:5000/user/create_user', {

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

	const openSuccess = (text) => {
		if (snackbar) return;
		setSnackbar(
			<Snackbar
				onClose={() => setSnackbar(null)}
				before={<Icon28CheckCircleOutline fill="var(--vkui--color_icon_positive)" />}
			>
				{text}
			</Snackbar>,
		);
	};

	const openError = (text) => {
		if (snackbar) return;
		setSnackbar(
			<Snackbar
				onClose={() => setSnackbar(null)}
				before={<Icon28ErrorCircleOutline fill="var(--vkui--color_icon_negative)" />}
			>
				{text}
			</Snackbar>,
		);
	};

	const [activeModal, setActiveModal] = useState('null');

	return (
		<ConfigProvider appearance="dark">
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout popout={popout}>
						<SplitCol>
							{activePanel !== null ? (
								<View activePanel={activePanel}>
									<Slider id='slider' username={username} go={go} userId={userId} bridge={bridge} />
									<Home id='home' username={username} openError={openError} openSuccess={openSuccess} vk_id={userId} panel={activePanel} go={go} />
									<Quest openError={openError} openSuccess={openSuccess} panel={activePanel} id='quest' go={go} />
									<CreateQuest panel={activePanel} vk_id={userId} id='CreateQuest' go={go} />
									<Notification panel={activePanel} id='Notification' go={go} />
									<Calendar setActiveModal={setActiveModal} panel={activePanel} id='calendar' go={go} />
									<Settings panel={activePanel} id='settings' go={go} />
								</View>
							) : (
								<ScreenSpinner state="loading" />
							)
							}
							{snackbar}
						</SplitCol>
					</SplitLayout>
					<ModalRoot activeModal={activeModal}>
						<ModalCard id="create" header="Создание задачи" onClose={e => setActiveModal(null)}>
							<FormItem htmlFor="example" top="📝 Название">
								<Input
									id="example"
									type="text"
									defaultValue="Lorem ipsum dolor sit amet"
								/>
								<div className='mt-3 container_input d-flex flex-column'>
									<button className={1 > 0 ? 'btn__create btn btn-dark' : 'btn__create btn btn-dark disabled'} onClick={null}>Создать задачу</button>
								</div>
							</FormItem>
						</ModalCard>
						<ModalCard onClose={e => setActiveModal(null)} id="edit">...</ModalCard>
					</ModalRoot>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
