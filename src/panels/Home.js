import React from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, PanelHeaderButton, Input, Header, Button, Group, ButtonGroup, FormItem, FormLayout, Card, CardGrid } from '@vkontakte/vkui';
import { Icon16DeleteOutline, Icon16PenOutline, Icon24AddOutline, Icon16ArticleBoxOutline, Icon16Add, Icon16Minus } from '@vkontakte/icons';

const Home = ({ id, go, fetchedUser }) => (
	<Panel id={id}>
		<PanelHeader
			before={
				<PanelHeaderButton>
					<Icon24AddOutline onClick={go} data-to="quest" />
				</PanelHeaderButton>
			}>Главная</PanelHeader>

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
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
