import { React } from 'react';
import PropTypes from 'prop-types';

import { Group, DateInput, LocaleProvider, FormItem, Checkbox, Button, ButtonGroup, Textarea, FormLayout, NativeSelect, Header, Input, Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';
import { Icon16ArticleBoxOutline, Icon16Add, Icon16Minus } from '@vkontakte/icons';

import Pole from './../Components/pole.js';

let change = () => {
	let selectType = document.getElementById("select_type");
	console.log(selectType.value);
}

let pole = () => {

	if (change == 'text') {
		console.log('pole: text');
	}
	if (change == 'check') {
		console.log('pole: check');
	}
	if (change == 'check') {
		console.log('pole: timer');
	}
}

const Quest = props => {
	return (
		<Panel id={props.id}>
			<PanelHeader
				before={<PanelHeaderBack onClick={props.go} data-to="home" />}
			>
				Создание задачи
			</PanelHeader>
			<Group separator="hide" header={<Header mode="secondary">Заполните поля</Header>}>
				<FormLayout>
					<FormItem top="Название" htmlFor="title_quest">
						<Input type="text" id='title_quest' placeholder="Задача №1" before={<Icon16ArticleBoxOutline />} />
					</FormItem>
					<FormItem top="Тип окна ввода" htmlFor="select_type">
						<NativeSelect onChange={change} id="select_type">
							<option value="text">Текстовое поле</option>
							<option value="check">Чек-лист</option>
							<option value="timer">Таймер</option>
						</NativeSelect>
					</FormItem>
					<Pole type={change} />
					<FormItem>
						<ButtonGroup mode="horizontal" gap="m" stretched>
							<Button before={<Icon16Add />} mode='outline'>Добавить окно</Button>
							<Button before={<Icon16Minus />} mode='outline'>Убрать окно</Button>
						</ButtonGroup>
					</FormItem>

					<FormItem>
						<Button size='l' stretched mode="overlay_primary">Создать задачу</Button>
					</FormItem>
				</FormLayout>
			</Group>
		</Panel>
	);
};

Quest.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Quest;