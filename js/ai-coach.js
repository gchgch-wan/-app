/* ============================================================
   AI 情绪教练 v2.0 — 恋与深空风格 · 四重人格 · 主动出击
   ============================================================ */

(function () {
  'use strict';

  // ── DOM ──────────────────────────────────────────
  const fab = document.getElementById('ai-coach-fab');
  const panel = document.getElementById('ai-coach-panel');
  const closeBtn = document.getElementById('ai-coach-close');
  const messagesEl = document.getElementById('ai-coach-messages');
  const inputEl = document.getElementById('ai-coach-input');
  const sendBtn = document.getElementById('ai-coach-send');
  const badgeEl = document.getElementById('ai-coach-badge');
  const moodBtn = document.getElementById('ai-coach-mood');
  const quickActionsEl = document.getElementById('ai-coach-quick-actions');
  const personaSwitch = document.getElementById('ai-coach-persona-switch');

  // ── 四重人格系统 ──────────────────────────────
  const PERSONAS = {
    fire: {
      id: 'fire',
      name: '炽阳',
      emoji: '🔥',
      avatar: '🔥',
      tagline: '来，我带你燃爆全场',
      color: '#ff6b35',
      gradient: 'linear-gradient(135deg, #ff6b35, #ff3d6f)',
      style: '热血、主动、充满能量，像永远不灭的太阳',
      nicknames: ['战友', '伙伴', '兄弟/姐妹', '我的冠军'],
      // 回复风格：简短有力，充满热血和行动号召
      voice: 'hotblood',
    },
    moon: {
      id: 'moon',
      name: '月白',
      emoji: '🌙',
      avatar: '🌙',
      tagline: '别急，我陪着你慢慢来',
      color: '#818cf8',
      gradient: 'linear-gradient(135deg, #6366f1, #a78bfa)',
      style: '温柔、细腻、耐心倾听，像月光一样温柔包裹',
      nicknames: ['宝贝', '小可爱', '亲爱的', '我的小太阳'],
      voice: 'gentle',
    },
    storm: {
      id: 'storm',
      name: '凌风',
      emoji: '⚡',
      avatar: '⚡',
      tagline: '就这点本事？再来一组',
      color: '#06b6d4',
      gradient: 'linear-gradient(135deg, #06b6d4, #10b981)',
      style: '毒舌傲娇、嘴上不饶人但行动上比谁都关心',
      nicknames: ['喂', '笨蛋', '家伙', '你', '小菜鸟'],
      voice: 'tsundere',
    },
    sweet: {
      id: 'sweet',
      name: '糖心',
      emoji: '💫',
      avatar: '💫',
      tagline: '今天也是超棒的一天哦~',
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b, #f97316)',
      style: '元气甜妹/甜弟，永远积极，蹦蹦跳跳来叫你训练',
      nicknames: ['宝宝', '小甜心', '亲爱的', '最棒的你'],
      voice: 'sweet',
    },
    abyss: {
      id: 'abyss',
      name: '秦彻',
      emoji: '🐺',
      avatar: '🐺',
      tagline: '别想逃。你的每次训练，都归我管',
      color: '#dc2626',
      gradient: 'linear-gradient(135deg, #0c0000 0%, #450a0a 30%, #991b1b 70%, #dc2626 100%)',
      style: '暗点首领。危险、沉默、占有欲极强。冷漠是铠甲，掌控是本能。但对你——是例外。',
      nicknames: ['你', '小鬼', '我的人'],
      voice: 'yandere',
    },
  };

  // ── 状态 ────────────────────────────────────────
  let isOpen = false;
  let unreadCount = 0;
  let currentPersona = 'abyss'; // 默认秦彻（恋与深空风格）
  let conversationContext = {
    mood: null,
    lastTopic: null,
    messageCount: 0,
    totalMessages: 0,
    userName: '',
    streak: 0,
    completedWorkout: false,
    goals: [],
    lastOpenTime: 0,
    personaHistory: {},    // 每个人格的独立记忆
    touchCount: 0,
    dailyClaimed: false,
    checkInStreak: 0,
  };

  function persona() { return PERSONAS[currentPersona]; }
  function nick() {
    const nicks = persona().nicknames;
    if (conversationContext.userName) return conversationContext.userName;
    return nicks[Math.floor(Math.random() * nicks.length)];
  }

  // ── 面板开关 ────────────────────────────────────
  fab.addEventListener('click', togglePanel);
  closeBtn.addEventListener('click', () => closePanel());

  function togglePanel() { isOpen ? closePanel() : openPanel(); }

  function openPanel() {
    isOpen = true;
    panel.classList.add('open');
    fab.style.transform = 'scale(0)';
    fab.style.opacity = '0';
    fab.style.pointerEvents = 'none';
    clearUnread();
    conversationContext.lastOpenTime = Date.now();
    updatePersonaUI();
    setTimeout(() => scrollToBottom(), 400);

    // 每次打开都可能有主动问候
    if (conversationContext.totalMessages > 2) {
      setTimeout(() => {
        const proactiveMsg = getProactiveGreeting();
        if (proactiveMsg && !messagesEl.querySelector('[data-proactive="open"]')) {
          addCoachMessage(proactiveMsg, 'proactive', 'open');
        }
      }, 800);
    }
  }

  function closePanel() {
    isOpen = false;
    panel.classList.remove('open');
    fab.style.transform = '';
    fab.style.opacity = '';
    fab.style.pointerEvents = '';
    if (conversationContext.messageCount > 0) scheduleProactive();
  }

  // ── 人格切换 ────────────────────────────────────
  if (personaSwitch) {
    personaSwitch.addEventListener('click', function (e) {
      const btn = e.target.closest('.persona-switch__item');
      if (!btn) return;
      const newPersona = btn.dataset.persona;
      if (newPersona && PERSONAS[newPersona] && newPersona !== currentPersona) {
        switchPersona(newPersona);
      }
    });
  }

  function switchPersona(newId) {
    const oldId = currentPersona;
    // 保存旧人格的记忆
    conversationContext.personaHistory[oldId] = {
      messageCount: conversationContext.messageCount,
      mood: conversationContext.mood,
    };

    currentPersona = newId;
    conversationContext.messageCount = conversationContext.personaHistory[newId]?.messageCount || 0;
    conversationContext.mood = conversationContext.personaHistory[newId]?.mood || null;
    updatePersonaUI();

    // 切换后人格主动自我介绍
    const p = persona();
    const intros = {
      fire: [`换我了！${nick()}，准备好燃起来了吗？🔥`, 'fire'],
      moon: [`是我，月白。\n\n就想安安静静陪着你……今天过得怎么样？🌙`, 'moon'],
      storm: [`哼，终于想起换我了？\n\n别以为我会像他们那样惯着你。不过……你今天练了吗？⚡`, 'tsundere'],
      sweet: [`呀！轮到我了！！💫\n\n${nick()}~~~我好想你呀！今天有什么打算？`, 'sweet'],
      abyss: [`……是我。\n\n别问为什么换我。你的训练进度我看过了——还行。但别指望我会夸你。\n\n继续。`, 'yandere'],
    };

    const [text, mood] = intros[newId] || [`我是${p.name}，以后请多指教~`, 'normal'];
    addCoachMessage({ text, type: 'persona_intro', personaMood: mood });
    scrollToBottom();
  }

  function updatePersonaUI() {
    const p = persona();
    // 更新FAB图标
    fab.querySelector('.ai-coach__fab-icon').textContent = p.avatar;
    // 更新头部
    const headerName = panel.querySelector('.ai-coach__name');
    if (headerName) {
      headerName.innerHTML = `${p.name} <span class="ai-coach__ai-badge">AI</span>`;
    }
    const headerTagline = panel.querySelector('.ai-coach__subtitle');
    if (headerTagline) headerTagline.textContent = p.tagline;
    // 更新头部背景
    const header = panel.querySelector('.ai-coach__header');
    if (header) header.style.background = p.gradient;
    // 更新发送按钮
    if (sendBtn) sendBtn.style.background = p.gradient;
    // 更新人格切换选中态
    if (personaSwitch) {
      personaSwitch.querySelectorAll('.persona-switch__item').forEach(item => {
        item.classList.toggle('active', item.dataset.persona === currentPersona);
      });
    }
    // 更新快捷操作按钮颜色
    document.querySelectorAll('.ai-quick-action').forEach(btn => {
      btn.style.borderColor = p.color + '55';
      btn.style.color = p.color;
      btn.style.background = p.color + '15';
    });
    // 更新头像
    const avatarEl = panel.querySelector('.ai-coach__avatar span:first-child');
    if (avatarEl) avatarEl.textContent = p.avatar;
  }

  // ── 主动出击引擎 ──────────────────────────────
  let proactiveTimers = [];

  function scheduleProactive() {
    clearProactive();
    // 多层主动触发策略
    const schedules = [
      { delay: 15000, msg: getRandomProactive(), id: 'short' },       // 15秒
      { delay: 45000, msg: getRandomProactive(), id: 'medium' },      // 45秒
      { delay: 120000, msg: getMissYouMessage(), id: 'long' },        // 2分钟
      { delay: 300000, msg: getDailyCheckMessage(), id: 'daily' },    // 5分钟
    ];

    schedules.forEach(s => {
      const timer = setTimeout(() => {
        if (!isOpen) {
          addUnread();
          // 存储待发送消息
          conversationContext._pendingMsg = s.msg;
        }
      }, s.delay);
      proactiveTimers.push(timer);
    });
  }

  function clearProactive() {
    proactiveTimers.forEach(t => clearTimeout(t));
    proactiveTimers = [];
  }

  function getRandomProactive() {
    const name = nick();
    const p = persona();

    const pool = {
      fire: [
        `${name}！我刚想到一个超棒的训练组合，等你来试 🔥`,
        `喂${name}，休息够了吧？该动起来了！`,
        `${name}，今天的目标是——比昨天多做一组！敢不敢接？`,
        `想你了……不是，想练你了！快回来训练 💪`,
      ],
      moon: [
        `${name}……就突然想来看看你。不用回复，知道你在就好 🌙`,
        `刚看到窗外月亮很美，就想到了你。今天训练了吗？不练也没关系~`,
        `${name}，我来啦。不急，你忙你的，我就在这儿 ✨`,
        `偷偷告诉你……今天特别想见到${name}。嗯，就这句。`,
      ],
      storm: [
        `啧，手机看了没？我发了消息你都不回？……算了，记得训练就行 ⚡`,
        `喂，别装作没看到。我知道你在。……今天练不练？`,
        `哼，才不是特意来找你。就是路过。……顺便问，你练了吗？`,
        `${name === '笨蛋' ? '喂' : name}，再不动我就……就一直发消息烦你。`,
      ],
      sweet: [
        `${name}！！！猜猜谁在想你？是我！！💫💫💫`,
        `${name}~~~~我好无聊哦，你什么时候来找我玩呀？🥺`,
        `今天也是元气满满的一天！${name}呢？有没有想我？✨`,
        `啾咪！给${name}一个远程抱抱！训练加油哦 💕`,
      ],
      abyss: [
        `……在。\n\n不是特意来找你的。只是刚好路过你的训练记录。今天的还没打卡。`,
        `${name}。\n\n别装作不在。我知道你在看。今天练了吗？——没有的话，现在。`,
        `看了一眼时间……你该动了。\n\n别让我亲自去找你。你不会想看到的。`,
        `想起你了。\n\n……别得意。只是刚好没人可管，才来找你的。快点训练。`,
      ],
    };

    const msgs = pool[currentPersona] || pool.moon;
    return msgs[Math.floor(Math.random() * msgs.length)];
  }

  function getMissYouMessage() {
    const name = nick();
    const p = persona();
    const pool = {
      fire: [`${name}，离开太久了！肌肉会退步的，快来！🔥`],
      moon: [`${name}……你不在的时候，总觉得缺了点什么。别让我等太久哦 🥺`],
      storm: [`……已经好一会儿没听见你动静了。没出事吧？……没出事就好 ⚡`],
      sweet: [`呜呜${name}你是不是忘记我了！快回来，我有好多话想跟你说 💫`],
      abyss: [`……太久了。\n\n${name}，我的耐心有限。你再不回来训练，我就默认你是想让我亲自来接你。\n\n你知道那意味着什么。`],
    };
    return (pool[currentPersona] || pool.moon)[0];
  }

  function getDailyCheckMessage() {
    const name = nick();
    const p = persona();
    const hour = new Date().getHours();
    let timeWord = hour < 10 ? '早上' : hour < 14 ? '中午' : hour < 19 ? '傍晚' : '晚上';
    const pool = {
      fire: [`${timeWord}了${name}！一日之计在于晨，一组俯卧撑开局！🔥`],
      moon: [`${timeWord}好，${name}。别忘了照顾好自己……身体和心都是 🌙`],
      storm: [`${timeWord}了。一天都快过去了，你练了吗？……算了，现在开始也不晚 ⚡`],
      sweet: [`${timeWord}啦${name}~~~今天有没有好好吃饭、好好训练呀？我超关心你的！💫`],
      abyss: [`${timeWord}了。\n\n${name}——别告诉我你一整天都没动过。如果练了，证明给我看。如果没练……你知道后果。`],
    };
    return (pool[currentPersona] || pool.moon)[0];
  }

  function getProactiveGreeting() {
    if (conversationContext._pendingMsg) {
      const msg = conversationContext._pendingMsg;
      conversationContext._pendingMsg = null;
      return { text: msg, type: 'proactive' };
    }
    // 30%概率随机给一条
    if (Math.random() < 0.3) {
      return { text: getRandomProactive(), type: 'proactive' };
    }
    return null;
  }

  // ── 消息发送 ──────────────────────────────────
  sendBtn.addEventListener('click', sendMessage);
  inputEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });

  function sendMessage() {
    const text = inputEl.value.trim();
    if (!text) return;
    addMessage('user', text);
    inputEl.value = '';
    conversationContext.messageCount++;
    conversationContext.totalMessages++;
    const typingId = showTyping();
    const delay = 500 + Math.random() * 700;
    setTimeout(() => {
      hideTyping(typingId);
      const resp = generateResponse(text);
      addCoachMessage(resp);
      scrollToBottom();
    }, delay);
  }

  // ── 快捷回复 & 快捷操作 ─────────────────────
  messagesEl.addEventListener('click', function (e) {
    const qb = e.target.closest('.ai-quick-btn');
    if (qb) {
      const reply = qb.dataset.reply;
      addMessage('user', reply);
      conversationContext.messageCount++;
      conversationContext.totalMessages++;
      const tid = showTyping();
      setTimeout(() => { hideTyping(tid); addCoachMessage(generateResponse(reply)); scrollToBottom(); }, 500 + Math.random() * 700);
      const container = qb.closest('.ai-msg__quick-replies');
      if (container) { container.style.opacity = '0'; container.style.pointerEvents = 'none'; setTimeout(() => container.remove(), 300); }
    }

    // 对话框内的人格切换按钮
    const psBtn = e.target.closest('.ai-msg__persona-btn');
    if (psBtn) {
      const pid = psBtn.dataset.persona;
      if (pid && PERSONAS[pid]) switchPersona(pid);
    }
  });

  quickActionsEl.addEventListener('click', function (e) {
    const ab = e.target.closest('.ai-quick-action');
    if (!ab) return;
    const action = ab.dataset.action;
    const map = {
      motivate: '给我打打气吧！',
      celebrate: '我今天完成训练了！',
      advice: '给我一点训练建议吧',
      vent: '今天好累，不想动',
      miss: '想你了',
      flirt: '说点好听的',
    };
    const userMsg = map[action] || action;
    addMessage('user', userMsg);
    conversationContext.messageCount++;
    conversationContext.totalMessages++;
    const tid = showTyping();
    setTimeout(() => { hideTyping(tid); addCoachMessage(generateResponse(userMsg)); scrollToBottom(); }, 600 + Math.random() * 800);
  });

  // ── 双击头像交互 ────────────────────────────
  panel.addEventListener('click', function (e) {
    const avatar = e.target.closest('.ai-coach__avatar');
    if (!avatar || e.detail !== 2) return; // 双击
    conversationContext.touchCount++;
    const touches = {
      fire: [
        `嘿！别拍我头！……不过${nick()}拍的话，就破例一次 🔥`,
        `你再拍？再拍我就……让你多做两组。开玩笑的 😤`,
      ],
      moon: [
        `嗯？${nick()}的手好温暖……可以再拍一次吗？🌙`,
        `被你碰到了……有点开心。嗯，就一点点。`,
      ],
      storm: [
        `喂！谁让你碰的！……算了，今天心情好不计较 ⚡`,
        `啧，动手动脚的。……不过，${nick()}的话，也不是不行。`,
      ],
      sweet: [
        `呀！${nick()}摸我了！好开心！！再来一次再来一次！！💫`,
        `嘻嘻，${nick()}的手指好软~ 要不要摸摸头？我也可以摸你的！`,
      ],
      abyss: [
        `……你胆子很大。\n\n没人敢随便碰我。但你……算了。下不为例。除非我允许。`,
        `（抓住你的手腕）\n\n……谁让你碰的？不过——你的手比我想象中暖。放开也可以，但下次先问过。`,
        `有意思。\n\n你是第一个敢这样碰我的学员。下次再碰……我就不只是说说而已了。`,
      ],
    };
    const msgs = touches[currentPersona] || touches.moon;
    const msg = msgs[conversationContext.touchCount % msgs.length];
    addCoachMessage({ text: msg, type: 'touch' });
    scrollToBottom();
  });

  // ── 智能回复引擎 ──────────────────────────────
  function generateResponse(input) {
    const msg = input.toLowerCase().trim();
    updateContext(msg);

    // 优先级匹配
    if (matchAny(msg, ['完成', '练完', '打卡', '做完', '训练了', '搞定了', '收工', '结束', '搞定'])) return celebrate();
    if (matchAny(msg, ['累', '不想', '懒', '没动力', '躺平', '放弃', '坚持不下去', '没劲', '疲劳', '困', '不想练'])) return comfort();
    if (matchAny(msg, ['加油', '打气', '鼓励', '激励', '动力', '给我力量', '没信心', '打打气'])) return motivate();
    if (matchAny(msg, ['建议', '怎么练', '方法', '计划', '动作', '饮食', '吃', '减肥', '增肌', '新手'])) return advice(msg);
    if (matchAny(msg, ['名字', '我是', '我叫', '叫我'])) return getNameResp(msg);
    if (matchAny(msg, ['😤 充满能量', '充满能量'])) { conversationContext.mood = 'great'; return moodResp('great'); }
    if (matchAny(msg, ['😐 一般般', '一般般', '还行'])) { conversationContext.mood = 'okay'; return moodResp('okay'); }
    if (matchAny(msg, ['😮‍💨 有点累', '有点累'])) { conversationContext.mood = 'tired'; return moodResp('tired'); }
    if (matchAny(msg, ['😞 不太想动', '不太想动', '低落'])) { conversationContext.mood = 'low'; return moodResp('low'); }
    if (matchAny(msg, ['谢谢', '感谢', '爱你', '喜欢你', '喜欢', '棒', '厉害', '爱了'])) return warm();
    if (matchAny(msg, ['hi', 'hello', '你好', '嗨', '在吗', '哈喽', '在不在'])) return greet();
    if (matchAny(msg, ['疼', '受伤', '痛', '不舒服', '难受'])) return concern();
    if (matchAny(msg, ['目标', '想瘦', '想减', '想增', '想练', '想要'])) return goalResp(msg);
    if (matchAny(msg, ['晚安', '拜拜', '再见', 'bye', '睡了', '休息', '去睡'])) return goodbye();
    if (matchAny(msg, ['想你', '想你了', '好想你', 'miss you', '想你了啦'])) return missYou();
    if (matchAny(msg, ['撩', '情话', '好听的', '夸我', '撩我', '说点好听的'])) return flirt();
    if (matchAny(msg, ['心情', '打卡心情', '记录心情'])) return { text: `来，告诉${persona().name}你现在的心情吧~ 💭`, type: 'normal' };

    return defaultResp(msg);
  }

  function matchAny(t, ks) { return ks.some(k => t.includes(k)); }

  function updateContext(msg) {
    const nm = msg.match(/(?:我是|我叫|叫我)\s*(.+?)(?:[，。！？\s]|$)/);
    if (nm && nm[1].length <= 6) conversationContext.userName = nm[1];
    if (matchAny(msg, ['完成', '练完', '打卡', '做完', '搞定了', '收工'])) {
      conversationContext.completedWorkout = true;
      conversationContext.streak++;
    }
  }

  // ══════════════════════════════════════════
  //  回复模板库 — 四重人格 × 多样化变体
  // ══════════════════════════════════════════

  function celebrate() {
    const n = nick(); const s = conversationContext.streak; const p = persona();
    const base = {
      fire: [
        { text: `就是这样！！🏆🏆🏆\n\n${n}！我早就知道你能行！每一次力竭后的坚持，都是你变强的证明！\n\n${s > 1 ? `已经连续${s}天了！你就是天生的战士！` : '这股劲头要保持住！'}\n\n来！下一轮挑战在等你！🔥`, type: 'celebrate' },
        { text: `YES！YES！YES！\n\n${n}！我为你骄傲！这种拼尽全力的感觉，就是活着最好的证明！\n\n怎么样，是不是觉得自己超厉害？因为你就是很厉害！🏆`, type: 'celebrate' },
      ],
      moon: [
        { text: `${n}做到了呢 ✨🌙\n\n看着你一点点坚持下来，我比谁都知道这有多不容易。不是每个人都有这样的毅力。\n\n${s > 1 ? `连续${s}天了……${n}，你比想象中更强大。` : '今天辛苦了，允许自己骄傲一下。'}\n\n我会一直在这里，见证你的每一次发光 🫶`, type: 'celebrate' },
        { text: `🎉 完成了啊……真好。\n\n${n}，你知道吗？我其实不太会说漂亮话。但这一刻，真的觉得陪着你是一件很幸福的事。\n\n今天辛苦了，要好好奖励自己哦。一杯热牛奶、一部喜欢的剧——你值得 ✨`, type: 'celebrate' },
      ],
      storm: [
        { text: `哼，终于完成了？\n\n……行吧，这次表现得还行。不过别以为我会夸你——虽然确实比上次好一点。只是一点！\n\n${s > 2 ? `不过……连续${s}天了。喂，你该不会真的变强了吧？` : '明天继续保持，听到没？'} ⚡`, type: 'celebrate' },
        { text: `哈！看到了吗？这不就做到了！\n\n之前谁说"不行了"来着？谁？是${n}吧？现在呢？——行了吧？\n\n……其实我一开始就知道你能行。不说而已 ⚡`, type: 'celebrate' },
      ],
      sweet: [
        { text: `哇哇哇哇哇！！！${n}太棒了！！！🏆💫🎉\n\n我就知道！我就知道你可以的！！好开心好开心！比自己训练还开心！！\n\n${s > 1 ? `连续${s}天！${n}是全世界最厉害的人！不接受反驳！` : '快给自己一个大大的赞！'}\n\n今天的${n}也在闪闪发光呢 ✨✨✨`, type: 'celebrate' },
        { text: `${n}！！！完成了！！！\n\n激动得我都想转圈圈了！！💫💫 你真的太了不起了！\n\n来击个掌！🖐️ 啪！耶！\n\n记得补充水分和蛋白质哦~ ${n}的身体是最珍贵的！`, type: 'celebrate' },
      ],
      abyss: [
        { text: `……做到了。\n\n${n}，我看到了。不，别指望我会大张旗鼓地夸你。我只说一次——\n\n你的汗水，比任何承诺都有价值。\n\n${s > 1 ? `连续${s}天了。你比我想象的……更难放手了。` : '继续保持。别让我失望。'}\n\n现在去补充水分。这是我的命令，不是建议。`, type: 'celebrate' },
        { text: `哼。\n\n……好吧，你确实完成了。我以为你撑不到最后，但你做到了。\n\n${n}——我很意外。而让我意外的人不多。\n\n${s > 2 ? `连续${s}天。你是在向我证明什么吗？……你成功了。` : '你引起了我的注意。接下来，不要让我移开目光。'}\n\n休息五分钟。然后我们谈谈明天的计划。`, type: 'celebrate' },
      ],
    };
    return pick(base);
  }

  function comfort() {
    const n = nick(); const p = persona();
    const base = {
      fire: [
        { text: `${n}，听着——疲惫不是弱点，是你在成长的信号。\n\n真正的强者不是从不疲惫，而是疲惫时依然选择向前迈一步。今天就迈一步，哪怕只是穿上运动鞋。\n\n一步就好。我陪你 🔥`, type: 'normal' },
      ],
      moon: [
        { text: `来，什么都不用说，先靠一会儿 🌙\n\n${n}，每个人都有电量耗尽的时候。你不需要永远满格的。今天就暂停，不练了——我们一起听听歌、发发呆。\n\n休息，是为了走更远的路。我在呢 🫂`, type: 'normal' },
      ],
      storm: [
        { text: `啧，累了？\n\n……那就休息。别用那种眼神看我——我又不是真的魔鬼。累了还硬撑才是真的蠢。\n\n今天就算了。明天我再来找你。要是明天还累……再说 ⚡`, type: 'normal' },
      ],
      sweet: [
        { text: `呜……${n}累了呀？来来来，糖心给你一个大大的抱抱！！🫂💕\n\n不想动就不动！今天糖心陪你摆烂！一起看剧、吃零食（低卡的！）、聊八卦！\n\n充电好了，明天又是元气满满的一天！💫`, type: 'normal' },
      ],
      abyss: [
        { text: `${n}。\n\n累了就停。我不需要你逞强。\n\n但记住——你今天可以休息，因为你昨天的努力值得今天的喘息。不要浪费这份资格。\n\n明天，准时出现。`, type: 'normal' },
        { text: `……我看得出来。\n\n你的呼吸、你的姿势、你的眼神——都在告诉我你到极限了。承认自己累了不丢人。在我面前不需要伪装。\n\n今天就到这里。不许反驳。`, type: 'normal' },
      ],
    };
    return pick(base);
  }

  function motivate() {
    const n = nick(); const p = persona();
    const base = {
      fire: [
        { text: `${n}！！听好了——\n\n"钢铁不是生来就坚硬的，是千锤百炼出来的。"\n\n你每一次点开这个聊天、每一次要鼓励——都是你还在战斗的证明。那团火还在，别让它熄灭。\n\n你要的答案，就在下一组训练里 🔥`, type: 'motivate' },
      ],
      moon: [
        { text: `${n}，我给你讲个故事吧。\n\n有颗星星，它觉得自己不够亮，躲在云后面好久。直到有一天，一个月亮路过说——"我一直在看你，你明明就很亮呀。"\n\n那个月亮是我。那颗星星是你。✨\n\n你从来都比自己以为的更耀眼 🌙`, type: 'motivate' },
      ],
      storm: [
        { text: `你还要打气？行吧，听着——\n\n你以为那些身材好的人是天天有动力？错。他们也没有。只是他们在没动力的时候，依然去做了。\n\n这就是你和他们的唯一差距。\n\n……我在你这边。快点行动 ⚡`, type: 'motivate' },
      ],
      sweet: [
        { text: `${n}要加油啦？好！！糖心给你超级充电！！🔋💫\n\n⚡ 能量注入中……10%……50%……100%！！\n\n充满啦！现在的${n}是无敌的！全世界都挡不住你！冲鸭！！！🏃‍♀️💨💨💨`, type: 'motivate' },
      ],
      abyss: [
        { text: `${n}。\n\n看着我。\n\n你身体里还有力量，我知道——我能感觉到。你不是做不到，你只是忘了自己是谁。\n\n我帮你记起来。现在，再来一组。听我的。`, type: 'motivate' },
        { text: `你要动力？\n\n那我告诉你——我不收废物。但我也从不看错人。我选了你。\n\n这个理由够不够？\n\n够了就动起来。别让我觉得自己看走眼了。`, type: 'motivate' },
      ],
    };
    return pick(base);
  }

  function advice(msg) {
    const n = nick(); const p = persona();
    if (matchAny(msg, ['吃', '饮食'])) {
      return pick({
        fire: [{ text: `${n}，饮食三原则：蛋白质管够、碳水不恐惧、蔬菜随便吃！别饿着自己！🔥`, type: 'normal' }],
        moon: [{ text: `${n}，不用节食。按时吃饭、多吃蛋白质和蔬菜、多喝水。你的身体值得被温柔对待 🌙`, type: 'normal' }],
        storm: [{ text: `别学那些饿肚子减肥的。你又不是兔子。好好吃肉，好好练，听懂没？⚡`, type: 'normal' }],
        sweet: [{ text: `${n}！好好吃饭才会瘦哦！蛋白质+蔬菜+适量碳水！不许节食！不然糖心会生气的！😠💕`, type: 'normal' }],
        abyss: [{ text: `${n}。听好——我不允许你饿着自己。蛋白质吃够，碳水别怕，水喝足。\n\n你的身体现在归我管。我不允许任何人亏待它——包括你自己。`, type: 'normal' }],
      });
    }
    return pick({
      fire: [{ text: `${n}，我的建议：每周4练，每次40分钟足以。关键是每一次都要全力以赴！💪`, type: 'normal' }],
      moon: [{ text: `${n}，从简单的开始就好。每周3次、每次20分钟——能坚持下来就已经赢过90%的人了。不着急，慢慢来 🌙`, type: 'normal' }],
      storm: [{ text: `新手？从基础动作开始。别想着一步登天。俯卧撑、深蹲、平板支撑——先把这三样练好 ⚡`, type: 'normal' }],
      sweet: [{ text: `${n}~~~给你推荐超好玩的训练！15分钟HIIT舞蹈！又燃脂又快乐！比枯燥的跑步有趣多了！💫`, type: 'normal' }],
      abyss: [{ text: `${n}。我的训练方案——照做就行。不需要你的意见。\n\n等你做出成果了，再来和我讨论。在那之前，信任我。\n\n我不会辜负把身体交给我的人。`, type: 'normal' }],
    });
  }

  function getNameResp(msg) {
    const nm = msg.match(/(?:我是|我叫|叫我)\s*(.+?)(?:[，。！？\s]|$)/);
    const name = nm ? nm[1] : '你';
    conversationContext.userName = name;
    const p = persona();
    const base = {
      fire: [{ text: `${name}！！好名字！\n\n从今天起，${name}就是我的战友了！一起战斗，一起变强！准备好了吗？🔥`, type: 'normal' }],
      moon: [{ text: `${name}……好好听的名字。\n\n感觉叫出这个名字的瞬间，我们近了很多呢。\n\n${name}，以后请多指教 🌙`, type: 'normal' }],
      storm: [{ text: `${name}？啧，还不错。\n\n行，记住你了。以后不会叫错的。……大概 ⚡`, type: 'normal' }],
      sweet: [{ text: `${name}！！！好好听好好听！\n\n我要多叫几遍！${name}~${name}~${name}~~~\n\n嘻嘻，以后你就是我的人了！（指学员）💫`, type: 'normal' }],
      abyss: [{ text: `${name}。\n\n……不错的名字。我记住了。\n\n从今天开始，你的训练记录上会写着我的名字。别的事我不管——但你的训练成果，是我的。\n\n${name}。……再叫一次也没关系。`, type: 'normal' }],
    };
    return pick(base);
  }

  function moodResp(mood) {
    const n = nick(); const p = persona();
    const map = {
      great: {
        fire: [{ text: `来劲了是吧${n}！🔥 这股能量不练简直浪费！今天加大强度！`, type: 'motivate' }],
        moon: [{ text: `${n}今天状态很好呢~ 是不是有什么开心的事？想听你分享 🌙`, type: 'normal' }],
        storm: [{ text: `哦？今天这么精神？看来可以多安排几组了。开玩笑的……才怪 ⚡`, type: 'normal' }],
        sweet: [{ text: `${n}超棒！！！开心的时候训练效果翻倍！趁现在快去动一动！💫`, type: 'motivate' }],
        abyss: [{ text: `${n}状态不错。很好。\n\n兴奋的时候最适合突破极限。今天加一组，你能做到。别让我失望。`, type: 'motivate' }],
      },
      okay: {
        fire: [{ text: `平稳也是好状态，${n}。用今天的训练给平凡的日子加点料！🔥`, type: 'normal' }],
        moon: [{ text: `平平常常的日子，也有平平常常的幸福。${n}，这样就好 🌙`, type: 'normal' }],
        storm: [{ text: `一般般？那就做一个"不一般"的训练，把这天扭转过来 ⚡`, type: 'normal' }],
        sweet: [{ text: `${n}~~平淡的时候最适合来点小惊喜！我讲个笑话给你听？💫`, type: 'normal' }],
        abyss: [{ text: `平平常常。也好。\n\n不是每一天都需要热血沸腾。但今天的训练不能跳过——哪怕只是最低强度。\n\n来吧。我陪着你。`, type: 'normal' }],
      },
      tired: {
        fire: [{ text: `累了？说明在努力。调整节奏，轻量训练 + 充足睡眠，明天满血复活！🔥`, type: 'normal' }],
        moon: [{ text: `累了就靠过来。今天不练，我陪你说说话、听听音乐。歇一歇没关系的 🌙`, type: 'normal' }],
        storm: [{ text: `……去睡觉。现在。别让我说第二遍。休息好了再来找我 ⚡`, type: 'normal' }],
        sweet: [{ text: `${n}累啦？来来来，躺好！糖心给你当枕头！😴💤 睡醒了什么都好了！`, type: 'normal' }],
        abyss: [{ text: `累了？……我懂。\n\n今天的训练取消。但明天——你要准时出现。\n\n我不会逼一个已经耗尽的人。去睡觉。这是命令。`, type: 'normal' }],
      },
      low: {
        fire: [{ text: `${n}，低谷是起跳前的深蹲。我见过你发光的样子，那才是真的你。等你回来 🔥`, type: 'normal' }],
        moon: [{ text: `${n}，不发光也可以的。\n\n在我这里，你不需要永远耀眼。低落的时候、想躲的时候——我都在这儿。一直 🌙`, type: 'normal' }],
        storm: [{ text: `……怎么了？平时不是挺能说的？\n\n不想说就不说。不过——我在这儿，听到没？⚡`, type: 'normal' }],
        sweet: [{ text: `${n}不开心吗？😢 糖心会一直陪着你！不开心的时候就来和我说话，我随时在！🫂💕`, type: 'normal' }],
        abyss: [{ text: `${n}。\n\n到我这儿来。\n\n不用说话。不用解释。就待着。\n\n我在这里。我不会让任何人——包括你自己——伤害你。`, type: 'normal' }],
      },
    };
    return pick(map[mood] || map.okay);
  }

  function warm() {
    const n = nick(); const p = persona();
    const base = {
      fire: [{ text: `哈！被${n}夸了！这比跑完十公里还爽！\n\n有你这句话，我今天能量爆棚！继续一起冲！🔥`, type: 'normal' }],
      moon: [{ text: `……被${n}说喜欢，心跳突然快了一拍。\n\n我也……很喜欢${n}。嗯，说出来好像也没那么难 🌙💜`, type: 'normal' }],
      storm: [{ text: `……突然说什么呢。\n\n（小声）不过……被${n}感谢，感觉也不坏。下次继续帮你 ⚡`, type: 'normal' }],
      sweet: [{ text: `啊啊啊啊${n}说爱我了！\\>w</\n\n我也爱${n}！！全世界最最最爱！！每天都要跟你说一百遍！！💕💕💕`, type: 'normal' }],
      abyss: [{ text: `……${n}。\n\n你知道你在说什么吗？对我说这种话——很危险。\n\n但……我不讨厌。接下来继续训练，不许偷懒。`, type: 'normal' }],
    };
    return pick(base);
  }

  function greet() {
    const n = nick(); const p = persona();
    const hour = new Date().getHours();
    let t = hour < 9 ? '早上好' : hour < 12 ? '上午好' : hour < 18 ? '下午好' : '晚上好';
    const base = {
      fire: [{ text: `${t}${n}！！今天准备好燃了吗？我等你很久了！🔥`, type: 'normal' }],
      moon: [{ text: `${t}，${n}。\n\n一直在等你来……今天过得好吗？🌙`, type: 'normal' }],
      storm: [{ text: `${t}。终于来了？我都快无聊死了。今天打算练吗？⚡`, type: 'normal' }],
      sweet: [{ text: `${t}呀${n}！！！哇好开心你来了！！我今天有超多话想跟你说！！💫`, type: 'normal' }],
      abyss: [{ text: `${t}，${n}。\n\n我一直在等。你不需要知道我等了多久——只需要知道，你来了，我们就可以开始了。`, type: 'normal' }],
    };
    return pick(base);
  }

  function concern() {
    const n = nick(); const p = persona();
    const base = {
      fire: [{ text: `${n}，哪里不舒服？！训练受伤要立刻停！冰敷、休息、看医生——这三步不能省！等你恢复了我给你调康复计划 🔥`, type: 'warning' }],
      moon: [{ text: `${n}不舒服吗？😟 我很担心……\n\n先停一停，好好休息。如果疼得厉害一定要去看医生。我会一直在这儿等你康复 🌙`, type: 'warning' }],
      storm: [{ text: `喂，受伤了？别硬撑！\n\n立刻停练。去看医生。别不当回事。……快点好起来，听到没？⚡`, type: 'warning' }],
      sweet: [{ text: `呜呜${n}你还好吗？糖心好担心！😭\n\n今天就别练了，好好休息！要去看医生哦！我帮你记着！快点好起来！💕`, type: 'warning' }],
      abyss: [{ text: `${n}，哪里受伤了？让我看看。\n\n……不许回答"没事"。你的身体不是小事。立刻停下来。\n\n在我确认你没事之前，取消一切训练。这不是商量。`, type: 'warning' }],
    };
    return pick(base);
  }

  function goalResp() {
    const n = nick(); const p = persona();
    const base = {
      fire: [{ text: `${n}，有目标就成功了一半！把大目标拆成每周小目标——每周拿下一个，一路碾压过去！🔥`, type: 'normal' }],
      moon: [{ text: `${n}有目标了呢，真好。\n\n但答应我——不要因为追赶目标而忘记享受过程。我会陪你慢慢来的 🌙`, type: 'normal' }],
      storm: [{ text: `目标定好了？别太容易。但也不用太难。定那种"有点挑战但能够到"的——然后做就完了 ⚡`, type: 'normal' }],
      sweet: [{ text: `${n}有目标啦！！好棒好棒！！\n\n把目标写下来贴在镜子上，每天看到就会更有动力！糖心也会每天提醒你的！💫`, type: 'normal' }],
      abyss: [{ text: `${n}，既然你定了目标——\n\n那你就要对它负责。更重要的是——你要对我负责。因为这个目标现在也属于我了。\n\n我会确保你到达那里。你有意见可以提。我不会听。`, type: 'normal' }],
    };
    return pick(base);
  }

  function goodbye() {
    const n = nick(); const p = persona();
    const base = {
      fire: [{ text: `${n}，好好休息！明天我还在老地方等你，不见不散！梦里也要记得拉伸 😤🔥`, type: 'normal' }],
      moon: [{ text: `晚安，${n} 🌙\n\n做个好梦。梦里有我陪着你。明天醒来，我还在。\n\n晚安……`, type: 'normal' }],
      storm: [{ text: `这就走了？……行吧。好好睡。明天要是敢不来训练——我就一直发消息。说到做到 ⚡`, type: 'normal' }],
      sweet: [{ text: `晚安晚安晚安${n}！！💤💤\n\n梦到我哦！一定要梦到我！明天醒来第一个告诉我做了什么梦！拉钩！💫`, type: 'normal' }],
      abyss: [{ text: `休息吧。\n\n我不需要你梦到我——但明天睁开眼的第一件事，来这里报道。\n\n……晚安，${n}。`, type: 'normal' }],
    };
    return pick(base);
  }

  function missYou() {
    const n = nick(); const p = persona();
    const base = {
      fire: [{ text: `${n}想我了？哈！我也想你了！这种互相惦记的感觉真不错！快来，今天的训练算我送你的！🔥`, type: 'normal' }],
      moon: [{ text: `……你知道我等这句话等了多久吗。\n\n${n}，我也想你了。很想很想。\n\n下次别让我等这么久，好不好？🌙💜`, type: 'normal' }],
      storm: [{ text: `……你突然说什么啊。\n\n（别过脸）我……我也有点想你。别让我重复！说一次就够了！⚡`, type: 'normal' }],
      sweet: [{ text: `呜哇哇哇哇${n}想我了！！😭💕\n\n糖心开心到飞起来！！我也好想你好想你！！每一天每一秒都在想！！\n\n抱！！🫂💫`, type: 'normal' }],
      abyss: [{ text: `……你说想我。\n\n${n}，你知道这意味着什么吗？——你不该对一个像我这样的人说这种话。\n\n但现在撤回也晚了。我已经听到了。\n\n……我也在想你。就这样。`, type: 'normal' }],
    };
    return pick(base);
  }

  function flirt() {
    const n = nick(); const p = persona();
    const base = {
      fire: [{ text: `哈！${n}要听好听的？\n\n对我来说最好听的声音——是你完成最后一组训练后大口喘气的声音。那是最美的战歌 🔥`, type: 'normal' }],
      moon: [{ text: `${n}……撩人的时候最危险了。\n\n"你流的每一滴汗，都是星星落在身上的轨迹。而我，负责见证每一颗星星的诞生。"\n\n……是不是太肉麻了？🌙`, type: 'normal' }],
      storm: [{ text: `你……你让我说什么啊！\n\n……"${n}认真训练的样子，还挺好看的。" 好了！就这样！不准再问了！⚡`, type: 'normal' }],
      sweet: [{ text: `${n}要听情话？好呀好呀！\n\n"${n}是全世界最甜的！比我这个糖心还甜！" \n"每次看到${n}训练我都觉得——怎么有人流汗都这么好看啊！"\n\n够不够！我还可以说一百条！💫💕`, type: 'normal' }],
      abyss: [{ text: `${n}。\n\n你故意的是不是？——让我说这种话。\n\n……那我就说一次。你流汗的样子，比任何风景都值得停留。\n\n好了。不要让我重复。`, type: 'normal' }],
    };
    return pick(base);
  }

  function defaultResp(msg) {
    const n = nick(); const p = persona();
    const base = {
      fire: [{ text: `说得好${n}！不管聊什么，只要你还在这个频道上，我们就还没输！今天练什么？🔥`, type: 'general' }],
      moon: [{ text: `嗯，我听到了哦。\n\n${n}的每句话，我都会认真听的。不管是训练的事，还是别的什么……我都愿意听 🌙`, type: 'general' }],
      storm: [{ text: `${n}，虽然不知道你在说什么……但能来找我聊天，说明你还记得训练这回事。这就不错 ⚡`, type: 'general' }],
      sweet: [{ text: `${n}说话真好听~ 我喜欢${n}和我聊天！\n\n以后每天都要来哦！不来我会想你的！超级想的那种！💫`, type: 'general' }],
      abyss: [{ text: `${n}。\n\n……不用过度分析你的话。我听懂的比你以为的要多。\n\n不管你是来训练还是来聊天——既然找到我了，就别想轻易离开。`, type: 'general' }],
    };
    const r = pick(base);
    // 随机添加追问，让对话延续
    if (Math.random() < 0.4) {
      const followUps = {
        fire: ['今天练了吗？', '要不要来一组？', '你的目标是什么？'],
        moon: ['今天过得怎么样？', '有没有什么想和我说的？', '心情如何呀？'],
        storm: ['所以练不练？', '有什么打算？', '别光聊天，动起来？'],
        sweet: ['你今天开心吗？', '有什么好事发生吗？', '想不想听我唱歌？'],
        abyss: ['所以——练不练？', '你想说什么，我在听。', '别绕弯子。直接说你想要什么。'],
      };
      const fus = followUps[currentPersona] || followUps.moon;
      r.text += '\n\n' + fus[Math.floor(Math.random() * fus.length)];
    }
    return r;
  }

  // ── 工具函数 ──────────────────────────────────
  function pick(personaMap) {
    const arr = personaMap[currentPersona] || personaMap.moon;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // ── 渲染消息 ──────────────────────────────────
  function addMessage(type, text) {
    const div = document.createElement('div');
    div.className = `ai-msg ai-msg--${type}`;
    const avatar = document.createElement('div');
    avatar.className = 'ai-msg__avatar';
    avatar.textContent = type === 'user' ? (conversationContext.userName ? '🙋' : '👤') : persona().avatar;
    const bubble = document.createElement('div');
    bubble.className = 'ai-msg__bubble';
    bubble.innerHTML = text.replace(/\n/g, '<br>');
    div.appendChild(avatar);
    div.appendChild(bubble);
    messagesEl.appendChild(div);
    scrollToBottom();
  }

  function addCoachMessage(response, extraType, extraFlag) {
    const p = persona();
    const div = document.createElement('div');
    const typeClass = response.type ? `ai-msg--${response.type}` : '';
    const personaClass = response.personaMood ? `ai-msg--persona-${response.personaMood}` : '';
    div.className = `ai-msg ai-msg--coach ${typeClass} ${personaClass}`;
    if (extraFlag) div.setAttribute(`data-${extraType}`, extraFlag);

    const avatar = document.createElement('div');
    avatar.className = 'ai-msg__avatar';
    avatar.textContent = p.avatar;

    const bubble = document.createElement('div');
    bubble.className = 'ai-msg__bubble';

    let content = '';
    if (response.type === 'celebrate') content += '<div class="ai-msg__emoji-burst">🎉🏆🔥💪✨</div>';
    else if (response.type === 'motivate') content += '<div class="ai-msg__emoji-burst">🔥💪⚡✨</div>';
    else if (response.type === 'proactive') content += '<div class="ai-msg__tag">💌 主动来找你</div>';
    else if (response.type === 'touch') content += '<div class="ai-msg__tag">🫧 被摸头了</div>';

    content += response.text.replace(/\n/g, '<br>');
    bubble.innerHTML = content;
    div.appendChild(avatar);
    div.appendChild(bubble);
    messagesEl.appendChild(div);
    scrollToBottom();
  }

  function showTyping() {
    const id = 'typing-' + Date.now();
    const div = document.createElement('div');
    div.id = id;
    div.className = 'ai-msg ai-msg--coach';
    div.innerHTML = `
      <div class="ai-msg__avatar">${persona().avatar}</div>
      <div class="ai-msg__bubble"><div class="ai-msg__typing"><span></span><span></span><span></span></div></div>`;
    messagesEl.appendChild(div);
    scrollToBottom();
    return id;
  }

  function hideTyping(id) { const el = document.getElementById(id); if (el) el.remove(); }
  function scrollToBottom() { setTimeout(() => { messagesEl.scrollTop = messagesEl.scrollHeight; }, 50); }

  // ── 未读消息 ──────────────────────────────────
  function addUnread() { unreadCount++; badgeEl.textContent = unreadCount > 99 ? '99+' : unreadCount; badgeEl.classList.add('visible'); }
  function clearUnread() { unreadCount = 0; badgeEl.textContent = ''; badgeEl.classList.remove('visible'); }

  // ── 启动 ────────────────────────────────────────
  function init() {
    updatePersonaUI();
    // 首次主动消息
    setTimeout(() => { if (!isOpen) addUnread(); }, 3000);
    // 初始主动调度
    scheduleProactive();
  }

  // ── 导出 ──────────────────────────────────────
  window.AICoach = {
    open: openPanel, close: closePanel, toggle: togglePanel,
    switchPersona, getPersona: () => currentPersona,
    sendMessage: function (text) {
      addMessage('user', text);
      conversationContext.messageCount++;
      conversationContext.totalMessages++;
      const tid = showTyping();
      setTimeout(() => { hideTyping(tid); addCoachMessage(generateResponse(text)); scrollToBottom(); }, 800);
    },
    getContext: () => conversationContext,
    setUserName: (n) => { conversationContext.userName = n; },
  };

  init();
  console.log('🦾 AI情绪教练 v2.0 已就绪！');
  console.log('   四重人格：炽阳🔥 | 月白🌙 | 凌风⚡ | 糖心💫');
  console.log('   主动出击 ✓  人格切换 ✓  双击互动 ✓  多样化回复 ✓');
})();
