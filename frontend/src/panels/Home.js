import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Panel, View, Snackbar, Input, Header, Button, Group, ButtonGroup, FormItem, SplitCol, Card, CardGrid, SplitLayout } from '@vkontakte/vkui';
import { Icon16DeleteOutline, Icon16PenOutline, Icon24AddOutline, Icon16ArticleBoxOutline, Icon16Add, Icon16Minus } from '@vkontakte/icons';

import HeaderMy from '../Components/HeaderMy'
import NavbarMy from '../Components/NavbarMy'
import CreateQuestBtn from '../Components/Button/CreateQuestBtn';

import styled from 'styled-components';
import CardQuest from '../Components/CardQuest';

const Styled = styled.div`

`

export default function Home(props) {
	localStorage.setItem('sliderIsViewed', JSON.stringify(true));

	return (
		<View activePanel={props.panel}>
			<Panel id={props.id}>
				<Group className='mt-5 '>
					<Styled>
						<HeaderMy displayName="Главный экран" go={props.go} leftBtn={<CreateQuestBtn go={props.go} />} />
						<SplitLayout>
							<SplitCol>
								<Group mode="plain" size="l">
									<CardQuest />
								</Group>
							</SplitCol>
						</SplitLayout>
					</Styled >
				</Group>
				<NavbarMy go={props.go} titleBtn='home' />
			</Panel>
		</View>
	);
}
Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

