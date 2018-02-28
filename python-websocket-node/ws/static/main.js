
// for test
const TESTKON = ['IPv6是Internet Protocol Version',
'6的缩写，其中InterneProtocol译为“互联网协议”。',
'IPv6是IETF（互联网工程任务组，Internet Engineering Task Force）',
'设计的用于替代现行版本IP协议（IPv4）的下一代IP协议。',
'目前IP协议的版本号是4（简称为IPv4），它的下一个版本就是IPv6。'].join('')

var app = new Vue({
  data: {
    title: '答题助手',
    question: '',
    options: [],
    knowledge: '',
    answers: [],
  },

  watch: {},

  computed: {},

  filters: {},

  methods: {},

  directives: {},

  created() {
    // open a webSocket
    var ws = new WebSocket('ws://localhost:3000/ws/answer');
    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      console.log(data);
      this.question = data.question || this.question;
      this.knowledge = data.knowledge || this.knowledge;
      this.answers = data.answers || this.answers;
    };

    // for test
    // this.question = '第一个网络传播的蠕虫病毒诞生在什么时候?';
    // this.options = [
    //   '1988年1月12日',
    //   '1988年11月2日',
    //   '1988年12月1日'
    // ];
    // this.konwledge = TESTKON;
    // this.answers = [
    //   ['1988年1月12日', 19],
    //   ['1988年11月2日', 14],
    //   ['1988年12月1日', 1],
    // ]
  }
})

// mount
app.$mount('.answer');
