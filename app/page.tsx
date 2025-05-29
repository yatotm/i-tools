'use client'

import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Tag, 
  Space, 
  Button, 
  Avatar,
  Badge,
  Flex
} from 'antd'
import { 
  QrcodeOutlined, 
  CloudDownloadOutlined, 
  CarOutlined,
  RightOutlined,
  CodeOutlined,
  CloudOutlined,
  CustomerServiceOutlined
} from '@ant-design/icons'
import Link from 'next/link'

const { Title, Text } = Typography

interface Tool {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  href: string
  status: 'available' | 'coming-soon'
  category: string
  tags: string[]
  color: string
}

const tools: Tool[] = [
  {
    id: 'qrcode',
    title: '二维码生成器',
    description: '快速生成各种类型的二维码，支持文本、链接、WiFi等多种格式，提供高清下载和自定义样式',
    icon: <QrcodeOutlined />,
    href: '/qrcode',
    status: 'available',
    category: '编码工具',
    tags: ['二维码', 'QR Code', '生成器'],
    color: '#10b981'
  },
  {
    id: 'alipan-tv-token',
    title: '阿里云盘TV Token',
    description: '获取阿里云盘TV版授权Token，轻松在电视端使用阿里云盘，支持扫码登录和Token管理',
    icon: <CloudDownloadOutlined />,
    href: '/alipan-tv-token',
    status: 'available',
    category: '云存储',
    tags: ['阿里云盘', 'TV版', 'Token'],
    color: '#14b8a6'
  },
  {
    id: 'move-car',
    title: '挪车码牌生成器',
    description: '生成专属挪车码牌，支持微信小程序推送通知，让挪车变得更加便捷高效',
    icon: <CarOutlined />,
    href: '/move-car',
    status: 'available',
    category: '生活服务',
    tags: ['挪车', '码牌', '微信推送'],
    color: '#f59e0b'
  }
]

// 分类配置
const categoryConfig: Record<string, { icon: React.ReactNode; color: string }> = {
  '编码工具': { 
    icon: <CodeOutlined />, 
    color: '#10b981'
  },
  '云存储': { 
    icon: <CloudOutlined />, 
    color: '#14b8a6'
  },
  '生活服务': { 
    icon: <CustomerServiceOutlined />, 
    color: '#f59e0b'
  }
}

export default function HomePage() {
  // 工具分组
  const categoryGroups = tools.reduce((groups, tool) => {
    const category = tool.category
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(tool)
    return groups
  }, {} as Record<string, Tool[]>)

  return (
    <div>
      {/* 工具分类 */}
      <div>        <Title level={2} className="gradient-text tool-title">
          精选工具
        </Title>
        
        {Object.entries(categoryGroups).map(([category, categoryTools]) => (          <Card key={category} variant="borderless" styles={{ body: { padding: '32px 24px', marginBottom: 24 } }}>            <Flex align="center" gap="middle" className="category-header" style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #f0f0f0' }}>
              <Avatar 
                size={40}
                icon={categoryConfig[category]?.icon}
                className="tool-avatar"
                style={{ backgroundColor: categoryConfig[category]?.color }}
              />              <div className="category-info">
                <Flex align="center" gap="small">
                  <Title level={3} type="secondary" className="category-title">
                    {category}
                  </Title>
                  <Badge 
                    count={categoryTools.length} 
                    color={categoryConfig[category]?.color}
                  />
                </Flex>
              </div>
            </Flex>

            <Row gutter={[24, 24]}>
              {categoryTools.map(tool => (
                <Col key={tool.id} xs={24} sm={12} lg={8}>
                  <Link href={tool.href}>
                    <Card
                      className="hover-lift"
                      hoverable={tool.status === 'available'}
                      styles={{ body: { padding: 24 } }}
                    >
                      <Flex gap="middle" vertical>
                        <Flex align="flex-start" gap="middle">                          <Avatar 
                            size={48}
                            icon={tool.icon}
                          />                          <div className="tool-card-content">
                            <Flex align="center" gap="small">
                              <Title level={4} className="category-title">
                                {tool.title}
                              </Title>
                              {tool.status === 'coming-soon' && (
                                <Tag color="warning">敬请期待</Tag>
                              )}
                            </Flex>                            <Text type="secondary">
                              {tool.description}
                            </Text>
                          </div>
                        </Flex>

                        <Space wrap>                          {tool.tags.map(tag => (
                            <Tag key={tag} color="blue">
                              {tag}
                            </Tag>
                          ))}
                        </Space>

                        {tool.status === 'available' && (
                          <Button 
                            type="primary" 
                            block
                            icon={<RightOutlined />}
                          >
                            立即使用
                          </Button>
                        )}
                      </Flex>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </Card>
        ))}
      </div>
    </div>
  )
}
