import Layout from "./components/Layout";
import Editor from "./components/Editor";
import MemoList from "./components/MemoList";
import { useState } from "react";
import type { Memo } from "./types";
 
const initialMemo = {
  id: Date.now(),
  text: "思いついたことを、サッとメモ。\n作業に集中するための、シンプルなメモアプリです！",
  timestamp: new Date().toLocaleString("ja-JP"),
};
 
function App(){
  const [memos, setMemos] = useState<Memo[]>([initialMemo]);
 
  const addMemo = (inputText: string) => {
    if (inputText.trim()) {
      const memo: Memo = {
        id: Date.now(),
        text: inputText,
        timestamp: new Date().toLocaleString("ja-JP"),
      };
      setMemos([memo, ...memos]);
      //新しく作成したmemoオブジェクトを配列の先頭に追加、最新のメモが常に最上位に
      //[memo, ...memos]：新しいメモ + 既存の全メモという新しい配列を作成
    }
  };
 
  return (
    <Layout>
      <div className="w-3/4 flex-col space-y-4">
        <Editor
          placeholder="新しいメモを入力.."
          type="shadow"
          onSubmit={addMemo}
        />
      </div>
 
      <MemoList memos={memos} setMemos={setMemos} />
    </Layout>
  );
}
 
export default App;