import { React, useState, Component } from 'react';
import { FormItem, Textarea, Panel, LocaleProvider, DateInput, Checkbox } from '@vkontakte/vkui';
export class Pole extends Component {

    render() {
        // const [value, setValue] = useState(() => new Date());
        // const [disablePast, setDisablePast] = useState(false);
        // const [disableFuture, setDisableFuture] = useState(false);
        return (
            <Panel>
                <FormItem top="Введите описание">
                    <Textarea placeholder="Сегодня мне нужно..." />
                </FormItem>
                <FormItem>
                    <Checkbox description="Все пользователи получат уведомление">Закрепить сообщение</Checkbox>
                </FormItem>
                <FormItem top='Дата начала'>
                    <LocaleProvider value='ru'>
                        <DateInput
                            // value={value}
                            // enableTime
                            // onChange={setValue}
                            // disablePast={disablePast}
                            // disableFuture={disableFuture}
                            showNeighboringMonth />
                    </LocaleProvider>
                </FormItem>
                <FormItem top='Дата окончания'>
                    <LocaleProvider value='ru'>
                        <DateInput
                            // value={value}
                            // enableTime
                            // onChange={setValue}
                            // disablePast={disablePast}
                            // disableFuture={disableFuture}
                            showNeighboringMonth />
                    </LocaleProvider>
                </FormItem>
            </Panel>
        )
    }

}

export default Pole;