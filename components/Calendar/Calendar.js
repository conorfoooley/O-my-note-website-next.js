import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { Button, Menu, Dropdown, Radio, } from "antd";
import { DownOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Separator from '../Separator/Separator'

import moment from 'moment'
const localizer = momentLocalizer(moment)

const myEventsList = []

const menu = (
    <Menu >
        <Menu.Item key="1">
            <ArrowRightOutlined />
        1st menu item
      </Menu.Item>
        <Menu.Item key="2">
            <ArrowRightOutlined />
        2nd menu item
      </Menu.Item>
        <Menu.Item key="3">
            <ArrowRightOutlined />
        3rd item
      </Menu.Item>
    </Menu>
)

export default ({ children }) => {
    return (
        <div className='calendar' >
            <div className='calendar-header'>
                <h4 className='client-list-title'>Your Calendar</h4>
                <Separator size={'small'} />
                <div className='dropdown'>Year:
                    <Dropdown overlay={menu}>
                        <Button style={{ marginLeft: '10px' }}>
                            Button <DownOutlined />
                        </Button>
                    </Dropdown>
                </div>
                <div className='dropdown'>Month:
                <Dropdown overlay={menu}>
                        <Button style={{ marginLeft: '10px' }}>
                            Button <DownOutlined />
                        </Button>
                    </Dropdown>
                </div>
                <div className='dropdown'>View:
              <Radio.Group value={'large'} >
                        <Button
                            type="primary"
                            shape="round"
                            style={{ backgroundColor: '#F4F0ED', borderColor: '#cfb992', color: "#000", fontSize: 12, marginLeft: 5 }}
                        >
                            MONTH
                    </Button>
                        <Button
                            type="default"
                            shape="round"
                            style={{ backgroundColor: '#fff', borderColor: 'F4F4F4', color: "#000", fontSize: 12, marginLeft: 5 }}
                        >
                            YEAR
                    </Button>
                    </Radio.Group>
                </div>
            </div>
            <Calendar
                localizer={localizer}
                events={myEventsList}
                views={['month']}
                startAccessor="start"
                endAccessor="end"
                toolbar={false}
                selectable={true}
                components={{
                    month: {
                        dateHeader: (props) => {
                            return (
                                <div>
                                    <div>{props.label}</div>

                                    {parseInt(props.label) % 2 === 0 ?
                                        (<ul style={{ listStyle: 'inside', paddingLeft: 10 }} >
                                            <li
                                                style={{
                                                    textAlign: 'left',
                                                    fontSize: 12,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                10:00 AM - This is usually
                    </li>
                                            <li
                                                style={{
                                                    textAlign: 'left',
                                                    fontSize: 12,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                10:00 AM - This is usually
                    </li>
                                        </ul>) : null}
                                </div>
                            )
                        }
                    }
                }
                }
                dayPropGetter={date => {
                    return {
                        className: 'special-day',
                        style: {
                            border: 'none',
                            borderTop: 'solid 4px #F4F4F4',
                            marginLeft: 3,
                            marginRight: 3
                        },
                    }
                }}
                eventPropGetter={(
                    event,
                    start,
                    end,
                    isSelected
                ) => {
                    debugger
                    return {
                        className: 'special-day',
                        style: {
                            backgroundColor: 'red'
                        }
                    }
                }
                }

            />
        </div>





    )
}