import React from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, PanelHeaderButton, Input, Header, Button, Group, ButtonGroup, FormItem, FormLayout, Card, CardGrid } from '@vkontakte/vkui';
import { Icon16DeleteOutline, Icon16PenOutline, Icon24AddOutline, Icon16ArticleBoxOutline, Icon16Add, Icon16Minus } from '@vkontakte/icons';

import HeaderMy from '../Components/HeaderMy'
import NavbarMy from '../Components/NavbarMy'
import CreateQuestBtn from '../Components/Button/CreateQuestBtn';

import styled from 'styled-components';
import CardQuest from '../Components/CardQuest';

const Styled = styled.div`
	margin-top:	48px;
`

const Home = (props) => (
	<Panel id={props.id}>
		<Styled>
			<HeaderMy displayName="Главный экран" go={props.go} leftBtn={<CreateQuestBtn go={props.go} />} />

			<Group className='mt-4 mb-4' header={<Header mode="secondary">Ваши задачи</Header>}>
				<FormLayout>
					<FormItem>
						<Group mode="plain" size="l">
							<CardQuest />
						</Group>
					</FormItem>
				</FormLayout>
			</Group>

			<NavbarMy go={props.go} titleBtn='home' />
		</Styled >
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Home;
