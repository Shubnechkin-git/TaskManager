import { React } from 'react';
import PropTypes from 'prop-types';

import { Group, DateInput, LocaleProvider, FormItem, View, Button, ButtonGroup, Textarea, FormLayout, NativeSelect, Header, Input, Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';
import { Icon16ArticleBoxOutline, Icon16Add, Icon16Minus } from '@vkontakte/icons';
import BackBtn from '../Components/Button/BackBtn';
import HeaderMy from '../Components/HeaderMy';
import CreateQuest from './Quest/CreateQuest';
import styled from 'styled-components';

const Styled = styled.div`
`

const Quest = (props) => {
	return (
		<View activePanel={props.panel}>
			<Panel id={props.id} >
				<Styled>
					<HeaderMy displayName="Создание задачи" go={props.go} leftBtn={<BackBtn go={props.go} />} />
					<Group className='mt-5'>
						<FormLayout>
							<FormItem>
								<Group mode="plain" size="l">
									<CreateQuest openError={props.openError} go={props.go} openSuccess={props.openSuccess} />
								</Group>
							</FormItem>
						</FormLayout>
					</Group>
				</Styled>
			</Panel>
		</View>
	);
};

Quest.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Quest;