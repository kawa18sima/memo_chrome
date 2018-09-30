let app = new Vue({
  el:"#app",
  data: {
    memos:[],
    display:{},
    viewFlag:false,
    count:0
  },
  methods:{
    newMemo:function(){
      this.display = {id:this.count, title:"", text:""};
      this.viewFlag = true;
      this.count += 1;
      chrome.storage.local.set({count:this.count});
    },

    selectMemo:function(memo){
      this.display = memo;
      this.viewFlag = true;
    },

    saveMemo:function(){
      this.memos = this.memos.filter(memo => this.display.id !== memo.id);
      this.memos.push(this.display);
      chrome.storage.local.set({memo: this.memos},()=>{});
      this.viewFlag = false;
    },

    deleteMemo:function(id){
      this.memos = this.memos.filter((memo) => memo.id !== id);
      chrome.storage.local.set({memo:this.memos});
    }
  },
  created:function(){
    chrome.storage.local.get(["memo", "count"], (data)=>{
      this.memos = data.memo;
      this.count = data.count;
    });
  }
});
