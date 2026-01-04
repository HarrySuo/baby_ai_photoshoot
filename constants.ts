import { TemplateScene, TemplateStyle } from './types';

export const SCENES: TemplateScene[] = [
  { id: 'crib', name: '婴儿床时光', description: '温馨的晨间唤醒时刻', promptPart: 'baby lying in a cozy white crib with soft bedding, morning sunlight' },
  { id: 'window', name: '飘窗小坐', description: '午后阳光下的静谧', promptPart: 'baby sitting on a bay window with sheer curtains, natural lighting, cozy cushion' },
  { id: 'parent', name: '亲子互动', description: '充满爱意的互动瞬间', promptPart: 'close up of baby holding a parent\'s finger, warm and emotional atmosphere' },
  { id: 'carpet', name: '客厅爬爬垫', description: '活泼玩耍的日常', promptPart: 'baby crawling on a colorful play mat in a bright living room, happy expression' },
  { id: 'park', name: '公园草坪', description: '清新自然的户外感', promptPart: 'baby sitting on green grass in a park, soft bokeh background, natural light' },
  { id: 'flowers', name: '小区花丛', description: '花团锦簇的梦幻', promptPart: 'baby surrounded by colorful flowers in a garden, soft focus, dreamy' },
  { id: 'beach', name: '沙滩玩沙', description: '海边度假风', promptPart: 'baby playing with sand on a sunny beach, blue ocean in background' },
  { id: 'autumn', name: '秋日落叶', description: '金黄色的秋天童话', promptPart: 'baby sitting among golden autumn leaves, warm tone, soft sweater' },
  { id: 'fullmoon', name: '满月纪念', description: '传统与现代结合的纪念', promptPart: 'baby in a celebratory setup for 1-month milestone, festive decorations' },
  { id: 'birthday', name: '周岁生日', description: '生日派对的欢乐', promptPart: 'baby with a birthday cake, balloons in background, party hat, cheerful' },
];

export const STYLES: TemplateStyle[] = [
  { id: 'cream', name: '软萌奶油风', description: '色彩明亮柔和，软糯显可爱', promptPart: 'creamy pastel colors, soft lighting, high key, cute and fluffy aesthetic' },
  { id: 'film', name: '复古胶片风', description: '暖调颗粒感，怀旧质感', promptPart: 'vintage film look, grain, warm tones, nostalgic atmosphere' },
  { id: 'fresh', name: '简约清新风', description: '低饱和干净，突出主体', promptPart: 'minimalist, clean background, low saturation, fresh and airy' },
  { id: 'dreamy', name: '童话梦幻风', description: '童趣元素，梦境般美好', promptPart: 'fairytale style, magical elements, dreamy soft focus, fantasy vibe' },
  { id: 'salt', name: '日系盐系风', description: '自然光影，生活气息', promptPart: 'Japanese salt style, natural light, candid feel, clean and simple' },
];

export const PRIVACY_POLICY_TEXT = `
1. 数据用途：您上传的照片仅用于本次AI写真生成，系统不会将其用于任何其他商业用途或泄露给第三方。
2. 存储期限：为了您的隐私安全，原始照片将在服务器保留7天后自动删除，生成的写真将在24小时后自动删除（无登录状态下）。
3. 法律合规：请确保您是照片中婴儿的法定监护人。严禁上传违法、色情或侵犯他人隐私的照片。
4. 免责声明：AI生成结果可能存在随机性，仅供娱乐和记录使用。
`;
