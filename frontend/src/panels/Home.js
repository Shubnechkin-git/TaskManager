import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Panel, View, Snackbar, Input, Header, Button, Group, ButtonGroup, FormItem, SplitCol, Card, CardGrid, SplitLayout, CellButton } from '@vkontakte/vkui';
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

	const [isLoadedData, setLoadedData] = useState(false);
	const [taskLen, setTaskLen] = useState(props.userTasks.length);


	useEffect(() => {
		if (!isLoadedData) {
			props.getTasksUser();
			setLoadedData(true);
			setTaskLen(props.userTasks.length);
		}
		if (props.userTasks.length == 0) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [props.userTasks]);



	return (
		<>
			<View activePanel={props.panel}>
				<Panel className='' id={props.id}>
					<Group mode="plain" className=''>
						<Styled>
							{/* <HeaderMy displayName="Главный экран" go={props.go} leftBtn={<CreateQuestBtn go={props.go} />} /> */}
							<SplitLayout>
								<SplitCol>
									<Group mode="plain" className='pt-5 pb-5' size="l">
										{props.userTasks.length > 0 ? (
											props.userTasks.map(task => (
												<CardQuest
													getTasksUser={props.getTasksUser}
													openError={props.openError} openSuccess={props.openSuccess}
													key={task.id} // Предполагается, что каждая задача имеет уникальный идентификатор
													vk_id={props.vk_id}
													id={task.id}
													title={task.title}
													description={task.description}
													image={task.image}
													reload={props.getTasksUser}
												/>
											))
										) : (
											<h1 className='mt-5 vh-100 text-center'>Нет созданных задач!</h1>
										)}

									</Group>
								</SplitCol>
							</SplitLayout>
						</Styled >
					</Group>
				</Panel>
			</View >
			{/* <NavbarMy go={props.go} titleBtn='home' /> */}
		</>
	);
}
Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

