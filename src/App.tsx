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
      //trim()は空白の削除と空白のみの文字列をfalseと評価する役割
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
      //ここで具体的な値を渡す
    </Layout>
  );
}
 
export default App;

// 親 (App): addMemo を定義し、Editor の onSubmit に渡す。
// 子 (Editor): 受け取った onSubmit を、入力中の inputText を引数にして呼ぶ。
// 効果: Editor のボタン→ onSubmit(inputText) → 親の addMemo 実行 → memos 更新 → 画面に新メモが表示。
// 付加動作: Editor は送信後に setinputText("") で入力欄をクリア。