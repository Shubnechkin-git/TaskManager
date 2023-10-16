import React from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, PanelHeaderButton, Input, Header, Button, Group, ButtonGroup, FormItem, FormLayout, Card, CardGrid } from '@vkontakte/vkui';
import { Icon16DeleteOutline, Icon16PenOutline, Icon24AddOutline, Icon16ArticleBoxOutline, Icon16Add, Icon16Minus } from '@vkontakte/icons';

import HeaderMy from '../Components/HeaderMy'
import NavbarMy from '../Components/NavbarMy'
import CreateQuestBtn from '../Components/Button/CreateQuestBtn';

import styled from 'styled-components';

const Styled = styled.div`
	margin-top:	48px;
`

const Home = (props) => (
	<Panel id={props.id}>
		<Styled>

			<HeaderMy displayName="Главный экран" go={props.go} leftBtn={<CreateQuestBtn go={props.go} />} />

			<Group header={<Header mode="secondary">Ваши задачи</Header>}>
				<FormLayout>
					<FormItem>
						<Group mode="plain" size="l">
							<CardGrid size="l">
								<Card mode="outline">
									{/* <div style={{ height: 96 }} /> */}
									<FormItem top="Название" htmlFor="title_quest">
										<Input type="text" id='title_quest' placeholder="Задача №1" before={<Icon16ArticleBoxOutline />} />
									</FormItem>
									<FormItem>
										<ButtonGroup mode="horizontal" gap="m" stretched>
											<Button before={<Icon16PenOutline />} mode='outline'>Редактировать</Button>
											<Button before={<Icon16DeleteOutline />} mode='outline'>Удалить</Button>
										</ButtonGroup>
									</FormItem>
								</Card>
							</CardGrid>
						</Group>
					</FormItem>
					<FormItem>
						<Group mode="plain" size="l">
							<CardGrid size="l">
								<Card mode="outline">
									{/* <div style={{ height: 96 }} /> */}
									<FormItem top="Название" htmlFor="title_quest">
										<Input type="text" id='title_quest' placeholder="Задача №1" before={<Icon16ArticleBoxOutline />} />
									</FormItem>
									<FormItem>
										<ButtonGroup mode="horizontal" gap="m" stretched>
											<Button before={<Icon16PenOutline />} mode='outline'>Редактировать</Button>
											<Button before={<Icon16DeleteOutline />} mode='outline'>Удалить</Button>
										</ButtonGroup>
									</FormItem>
								</Card>
							</CardGrid>
						</Group>
					</FormItem>
					<FormItem>
						<Group mode="plain" size="l">
							<CardGrid size="l">
								<Card mode="outline">
									{/* <div style={{ height: 96 }} /> */}
									<FormItem top="Название" htmlFor="title_quest">
										<Input type="text" id='title_quest' placeholder="Задача №1" before={<Icon16ArticleBoxOutline />} />
									</FormItem>
									<FormItem>
										<ButtonGroup mode="horizontal" gap="m" stretched>
											<Button before={<Icon16PenOutline />} mode='outline'>Редактировать</Button>
											<Button before={<Icon16DeleteOutline />} mode='outline'>Удалить</Button>
										</ButtonGroup>
									</FormItem>
								</Card>
							</CardGrid>
						</Group>
					</FormItem>
				</FormLayout>
			</Group>
			<NavbarMy go={props.go} titleBtn='home'/>
		</Styled >
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Home;
