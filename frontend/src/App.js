import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import VKBridge from '@vkontakte/vk-bridge';
import '@vkontakte/vkui/dist/vkui.css';
import { View, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol, ScreenSpinner, Snackbar, ModalRoot, ModalPage, ModalCard, FormItem, Input, usePlatform, Platform } from '@vkontakte/vkui';

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
import Loading from './panels/Loading';
import NavbarMy from './Components/NavbarMy';
import HeaderMy from './Components/HeaderMy';
import CreateQuestBtn from './Components/Button/CreateQuestBtn';


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
				VKBridge.send('VKWebAppShowBannerAd', {
					banner_location: 'bottom'
				})
					.then((data) => {
						if (data.result) {
							// Баннерная реклама отобразилась
						}
					})
					.catch((error) => {
						// Ошибка
						console.log(error);
					});
				setUsername(userInfo.first_name);
				setUserId(userInfo.id);
				console.log(userInfo);

				// axios.post('user/create_user', {
				axios.post('https://taskmanagerbackend.cleverapps.io/user/create_user', {

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
				setActivePanel('loading');//
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
		if (userId) {
			getTasksUser();
		}
	}, []);
	// Vk bridge end
	useEffect(() => {
		const onlineHandler = () => {
			const parsedData = JSON.parse(localStorage.getItem('sliderIsViewed'));
			if (parsedData === true)
				setActivePanel('home'); // Установка активной панели по умолчанию при восстановлении соединения
			else
				setActivePanel('slider'); // Установка активной панели по умолчанию при восстановлении соединения
		};



		const offlineHandler = () => {
			setActivePanel('loading'); // Сброс активной панели при потере соединения
		};

		window.addEventListener('online', onlineHandler);
		window.addEventListener('offline', offlineHandler);

		return () => {
			window.removeEventListener('online', onlineHandler);
			window.removeEventListener('offline', offlineHandler);
		};
	}, []);


	const handleVibro = (k) => {
		let vibrationIs = JSON.parse(localStorage.getItem('vibrationIs')) !== null ? JSON.parse(localStorage.getItem('vibrationIs')) : 'on';
		if (k == 1) {
			console.log(vibrationIs);
			if (vibrationIs == 'on')
				VKBridge.send('VKWebAppTapticNotificationOccurred', {
					type: 'success',
					disable_vibration_fallback: false
				})
					.then((data) => {
						if (data.result) {
							// Информация передана генератору
							console.log(data.result);
						}
					})
					.catch((error) => {
						// Ошибка
						console.log("1:", error);
					})
		}
		else {
			if (vibrationIs == 'on')
				VKBridge.send('VKWebAppTapticNotificationOccurred', {
					type: 'error',
					disable_vibration_fallback: false
				})
					.then((data) => {
						if (data.result) {
							// Информация передана генератору
							console.log(data.result);
						}
					})
					.catch((error) => {
						// Ошибка
						console.log("2:", error);
					})
		}
	}

	const openSuccess = (text) => {
		setSnackbar(null);
		handleVibro(1);
		setSnackbar(
			<Snackbar
				duration={3000}
				onClose={() => setSnackbar(null)}
				before={<Icon28CheckCircleOutline fill="var(--vkui--color_icon_positive)" />}
			>
				{text}
			</Snackbar>,
		);
	};

	const openError = (text) => {
		setSnackbar(null);
		handleVibro(2);
		setSnackbar(
			<Snackbar
				duration={3000}
				onClose={() => setSnackbar(null)}
				before={<Icon28ErrorCircleOutline fill="var(--vkui--color_icon_negative)" />}
			>
				{text}
			</Snackbar>,
		);
	};

	const [activeModal, setActiveModal] = useState(null);

	const [title, setTitle] = useState(null);
	const [titleEdit, setEditTitle] = useState('');
	const [counter, setCounter] = useState([0, 0]);

	const handleChangeTitle = (e, k = 0) => {
		let value = e.target.value.trim();
		if (value !== '') {
			let truncatedValue = value.slice(0, 50);
			setCounter([truncatedValue.length, counter[1]]);
			setTitle(truncatedValue);
		} else {
			setTitle(null);
			setCounter([0, counter[1]]);
		}
	}

	const handleChangeEditTitle = (e) => {
		let value = e.target.value.trim();
		if (value !== '') {
			let truncatedValue = value.slice(0, 50);
			setCounter([counter[0], truncatedValue.length]);
			setEditTitle(truncatedValue);
		} else {
			setEditTitle(null);
			setCounter([counter[0], 0]);
		}
	}

	const handleUpdate = () => {
		console.log(titleEdit);
		axios.put('path').then((response) => {
			if (response.data.success) {
				openSuccess(response.data.message);
			} else {
				openError(response.data.message);
			}
		}).catch((error) => {
			openError(error.response.data.message);
		});
		console.log(idCounter);
	}

	const [userTasks, setUserTasks] = useState([]);
	const [isLoadedData, setIsLoadedData] = useState(false);

	const getTasksUser = () => {
		if (userId > 0) {
			axios.get('https://taskmanagerbackend.cleverapps.io/tasks/get', {
				params: {
					id: userId
				}
			}).then((response) => {
				setIsLoadedData(true);
				setUserTasks(response.data);
				console.log(response);
				go('home', 1);
			}).catch((error) => {
				setIsLoadedData(false);
				console.error(error);
			});
		}
	}


	const handleCreate = (k = 0) => {
		if (title !== null) {
			axios.post('https://taskmanagerbackend.cleverapps.io/counters/create_counter', { title, vk_id: userId }).then((response) => {
				console.log(response);
				if (response.data.success) {
					if (k == 1) {
						fetchCounters(1);
					} else
						fetchCounters(1);
					setActiveModal(null);
					setTitle(null);
					setCounter([0, 0]);
					VKBridge.send('VKWebAppCheckNativeAds', {
						ad_format: 'interstitial ' /* Тип рекламы */
					})
						.then((data) => {
							if (data.result) {
								// Предзагруженные материалы есть
								VKBridge.send('VKWebAppShowNativeAds', {
									ad_format: 'interstitial' /* Тип рекламы */
								})
									.then((data) => {
										if (data.result) {
											// Реклама была показана
											console.log(data.result);
										} else {
											// Ошибка
										}
									})
									.catch((error) => { console.log(error); });
							} else {
								// Материалов нет 
								console.log('Материалов нет!');
							}
						})
						.catch((error) => { console.log(error); });
					openSuccess(response.data.message);
				}
				else
					openError(response.data.message);
			}).catch((error) => {
				console.log(error);
				openError(error.response.data.message);
			});
		}
	}

	const [userCounters, setUserCounters] = useState([]);
	const [isData, setIsData] = useState(false);

	const fetchCounters = (k = 0) => {
		if (k == 1)
			setUserCounters([]);

		if (userId > 0) {
			axios.get('https://taskmanagerbackend.cleverapps.io/counters/get', {
				params: {
					id: userId
				}
			}).then((response) => {
				setIsData(true)
				setUserCounters(response.data);
				console.log(response);
			}).catch((error) => {
				setIsData(false)
				console.error(error);
			});
		}
	}


	const [idCounter, setIdEdit] = useState(null);

	const handleCLose = () => {
		setActiveModal(null);
		setEditTitle(null);
		setTitle(null);
		setIdEdit(null);
		setCounter([0, 0]);
	}

	return (
		<ConfigProvider appearance="dark">
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout popout={popout}>
						<SplitCol>
							{activePanel !== 'slider' &&
								<HeaderMy setActiveModal={setActiveModal} displayName={activePanel} go={go} leftBtn={<CreateQuestBtn go={go} />} />
							}
							{activePanel !== null ? (
								<View activePanel={activePanel}>
									<Slider getTasksUser={getTasksUser} id='slider' username={username} go={go} userId={userId} bridge={bridge} />
									<Home userTasks={userTasks} isLoadedData={isLoadedData} getTasksUser={getTasksUser} id='home' username={username} openError={openError} openSuccess={openSuccess} vk_id={userId} panel={activePanel} go={go} />
									<Quest openError={openError} openSuccess={openSuccess} panel={activePanel} id='quest' go={go} />
									<CreateQuest panel={activePanel} vk_id={userId} id='CreateQuest' go={go} />
									<Notification panel={activePanel} id='Notification' go={go} />
									<Calendar setCounter={setCounter} setIdEdit={setIdEdit} handleVibro={handleVibro} setIsData={isData} setEditTitle={setEditTitle} openError={openError} openSuccess={openSuccess} fetchCounters={fetchCounters} vk_id={userId} userCounters={userCounters} setActiveModal={setActiveModal} panel={activePanel} id='calendar' go={go} />
									<Settings panel={activePanel} id='settings' go={go} />
									<Loading id="loading" getTasksUser={getTasksUser} panel={activePanel} go={go} />
								</View>
							) : (
								<ScreenSpinner state="loading" />
							)
							}
							{activePanel !== 'quest' && activePanel !== 'slider' && activePanel !== 'loading' &&
								<NavbarMy go={go} activeModal={activeModal} titleBtn={activePanel} />
							}
							{snackbar}
						</SplitCol>
					</SplitLayout>
				</AppRoot>
				<ModalRoot activeModal={activeModal}>
					<ModalCard className='mb-5' id="create" header="Создание счетчика" onClose={e => handleCLose()}>
						<FormItem htmlFor="example" top="📝 Название">
							<Input
								id="example"
								type="text"
								onChange={e => handleChangeTitle(e)}
								placeholder="Lorem ipsum dolor sit amet"
							/>
							{counter[0]}/50
							<div className='mt-3 container_input d-flex flex-column'>
								<button onClick={handleCreate} className={counter[0] > 0 ? 'btn__create btn btn-dark' : 'btn__create btn btn-dark disabled'}>Создать задачу</button>
							</div>
						</FormItem>
					</ModalCard>
					<ModalCard header="Редактирование счетчика" onClose={e => handleCLose()} id="edit">
						<FormItem htmlFor="example" top="📝 Название">
							<Input
								id="example"
								type="text"
								value={titleEdit}
								onChange={e => handleChangeEditTitle(e)}
								placeholder="Lorem ipsum dolor sit amet"
							/>
							{counter[1]}/50
							<div className='mt-3 container_input d-flex flex-column'>
								<button onClick={e => handleUpdate(1)} className={counter[1] > 0 ? 'btn__create btn btn-dark' : 'btn__create btn btn-dark disabled'}>Сохранить</button>
							</div>
						</FormItem></ModalCard>
				</ModalRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
