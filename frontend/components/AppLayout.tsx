"use client";

import React, { ReactNode } from 'react';
import { Layout, Menu } from 'antd';
import Link from 'next/link';

const { Header, Content, Footer } = Layout;

export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <Layout className="layout" style={{ minHeight: '100vh' }}>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="logo" style={{ color: 'white', marginRight: '40px', fontSize: '20px', fontWeight: 'bold' }}>
                    PhotoApp
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['home']}
                    items={[
                        { key: 'home', label: <Link href="/">Explore</Link> },
                        { key: 'upload', label: <Link href="/upload">Upload</Link> },
                    ]}
                />
            </Header>
            <Content style={{ padding: '50px' }}>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    {children}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>PhotoApp ©2026 Created by Senior Full-stack Engineer</Footer>
        </Layout>
    );
}
