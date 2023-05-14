import React from 'react';
import ModalAddClient from '../ModalAddClient/ModalAddClient'
import Separator from '../Separator/Separator'
import { Table, Button } from "antd";
import { DownOutlined, LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';

const listData = [];
for (let i = 0; i < 23; i++) {
    listData.push({
        href: 'http://ant.design',
        firstName: `client`,
        lastName: `parfum${i + 1}`,
        email: 'email@example.com',
        date: '06 Jul 2020',
    });
}

const columns = [
    {
        title: "FIRST NAME",
        dataIndex: "firstName",
        render: (text, row, index) => {
            return <div>{text}</div>;
        },
    },
    {
        title: "LAST NAME",
        dataIndex: "lastName",
        render: (text, row, index) => {
            return <div>{text}</div>;
        },
    },
    {
        title: "EMAIL",
        dataIndex: "email",
        render: (text, row, index) => {
            return <div>{text}</div>;
        },
    },
    {
        title: "REGISTRATION DATE",
        dataIndex: "date",
        render: (text, row, index) => {
            return <div>{text}</div>;
        },
    },
    {
        title: " ",
        dataIndex: "href",
        render: (text, row, index) => {
            return (
                <Button
                    shape='link'
                    style={{ color: "#cfb992", display: 'hidden' }}>
                    Show more <DownOutlined />
                </Button>
            )
        },
    },
];


function tableItemRender(current, type, originalElement) {

    if (type === 'prev') {
        return <LeftCircleOutlined style={{ fontSize: '26px', color: '#cfb992' }} />
    } else if (type === 'next') {
        return <RightCircleOutlined style={{ fontSize: '26px', color: '#cfb992' }} />;
    } else if (type === 'page') {
        return <div>{current.toString()}</div>;
    }

    return originalElement;
}

export default (props) => {
    return (
        <div style={{ width: '100%' }} >
            <div className='client-list-header'>
                <h2 className='client-list-title'>Client list</h2>
                <Separator />

                <ModalAddClient />
            </div>
            <div className='client-list-body'>
                <Table
                    columns={columns}
                    dataSource={listData}
                    pagination={{
                        style: {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            float: 'unset'
                        },
                        pageSize: 8,
                        itemRender: (page, type, originalElement) =>
                            tableItemRender(page, type, originalElement)
                    }} />
            </div>
        </div>
    )
}