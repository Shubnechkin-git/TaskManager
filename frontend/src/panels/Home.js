import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Panel, View, Snackbar, Input, Header, Button, Group, ButtonGroup, FormItem, SplitCol, Card, CardGrid, SplitLayout } from '@vkontakte/vkui';
import { Icon16DeleteOutline, Icon16PenOutline, Icon24AddOutline, Icon16ArticleBoxOutline, Icon16Add, Icon16Minus } from '@vkontakte/icons';

import HeaderMy from '../Components/HeaderMy'
import NavbarMy from '../Components/NavbarMy'
import CreateQuestBtn from '../Components/Button/CreateQuestBtn';

import styled from 'styled-components';
import CardQuest from '../Components/CardQuest';
import axios from 'axios';
import VKBridge from '@vkontakte/vk-bridge';
const Styled = styled.div`

`

export default function Home(props) {
	localStorage.setItem('sliderIsViewed', JSON.stringify(true));

	const [userTasks, setUserTasks] = useState([]);
	const [isLoadedData, setIsLoadedData] = useState(false);

	let vk_id = null;

	const fetchUserId = async () => {
		try {
			const userInfo = await VKBridge.send('VKWebAppGetUserInfo');
			vk_id = userInfo.id;
			return vk_id;
		}
		catch (err) {
			console.error(err);
		}
	}

	const getTasksUser = () => {
		let user = fetchUserId().then(res => {
			if (vk_id > 0) {
				axios.get('https://192.168.0.108:5000/tasks/get', {
					params: {
						id: vk_id
					}
				}).then((response) => {
					setIsLoadedData(true);
					setUserTasks(response.data);
					console.log(response);
				}).catch((error) => {
					console.error(error);
				});
			}
		});
	}

	useEffect(() => {
		if (!isLoadedData) {
			getTasksUser();
		} else {
			console.log("userTasks:", userTasks[0]);
		}
	}, [isLoadedData, userTasks]);

	return (
		<View activePanel={props.panel}>
			<Panel id={props.id}>
				<Group className='mt-5 '>
					<Styled>
						<HeaderMy displayName="Главный экран"  go={props.go} leftBtn={<CreateQuestBtn go={props.go} />} />
						<SplitLayout>
							<SplitCol>
								<Group mode="plain" size="l">
									{userTasks.length > 0 ? (
										userTasks.map(task => (
											<CardQuest
												getTasksUser={getTasksUser}
												openError={props.openError} openSuccess={props.openSuccess}
												key={task.id} // Предполагается, что каждая задача имеет уникальный идентификатор
												vk_id={props.vk_id}
												id={task.id}
												title={task.title}
												description={task.description}
												image={task.image}
												reload={getTasksUser}
											/>
										))
									) : (
										<h1>Нет созданных задач!</h1>
									)}

								</Group>
							</SplitCol>
						</SplitLayout>
					</Styled >
				</Group>
				<NavbarMy go={props.go} titleBtn='home' />
			</Panel>
		</View >
	);
}
Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

