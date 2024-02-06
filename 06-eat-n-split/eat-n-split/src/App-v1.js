import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

// Image links (from Pinterest):
// Anna: https://i.pinimg.com/564x/c9/95/e6/c995e67ae9bb45e292a9bd2647eafba1.jpg
// Denise: https://i.pinimg.com/564x/51/0f/db/510fdb94cddee5284c452c9f37ce9b4e.jpg
// Jason: https://i.pinimg.com/564x/05/b4/c8/05b4c820b35c90bada4a532d704c4ac6.jpg
// David: https://i.pinimg.com/564x/8a/cf/11/8acf11b5d80c96ec8b92472e5004f8b4.jpg
// Molly: https://i.pinimg.com/564x/15/a6/89/15a6898af34c2920eb5e3d0d39d4a3cc.jpg

// THIS IS MY VERSION that I initially built based on the demo without watching at the lectures
export default function App() {
  const [friendsList, setFriendsList] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showAddFriend, setShowAddFriend] = useState(false);

  function handleAddFriend(e, newFriend) {
    e.preventDefault();
    setFriendsList([...friendsList, newFriend]);
  }

  function handleSelectFriend(id) {
    setSelectedFriend(friendsList.find((friend) => friend.id === id));
  }

  function handleSplitBill(e, newBalance) {
    e.preventDefault();

    setFriendsList(() =>
      friendsList.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, key: friend.id, balance: newBalance }
          : { ...friend, key: friend.id }
      )
    );
    setSelectedFriend({ ...selectedFriend, balance: newBalance });
  }

  return (
    <main>
      <h1>🍔 EAT 'N SPLIT 🍕</h1>
      <div className="app">
        <div className="sidebar">
          <FriendsList
            friendsList={friendsList}
            onSelectFriend={handleSelectFriend}
          />
          <AddFriend
            onAddFriend={handleAddFriend}
            showAddFriend={showAddFriend}
            setShowAddFriend={setShowAddFriend}
          />
        </div>
        {selectedFriend && (
          <SplitBill friend={selectedFriend} onSplitBill={handleSplitBill} />
        )}
      </div>
    </main>
  );
}

function Button({ onClick, text }) {
  return (
    <button className="button" onClick={onClick}>
      {text}
    </button>
  );
}

function InputLabel({ icon, text }) {
  return (
    <span>
      {icon} {text}
    </span>
  );
}

function AddFriend({ onAddFriend, showAddFriend, setShowAddFriend }) {
  const [newFriend, setNewFriend] = useState({
    name: "",
    image: "",
    id: Date.now,
    balance: 0,
  });

  return (
    <div className="sidebar">
      {!showAddFriend ? (
        <Button
          text="Add Friend"
          onClick={() => setShowAddFriend(!showAddFriend)}
        />
      ) : (
        <>
          <form
            className="form-add-friend"
            onSubmit={(e) => {
              onAddFriend(e, newFriend);
              setNewFriend({
                name: "",
                image: "",
                id: Date.now,
                balance: 0,
              });
            }}
          >
            <InputLabel icon="👭" text="Friend name" />
            <input
              name="friendName"
              type="text"
              value={newFriend.name}
              onChange={(e) =>
                setNewFriend({ ...newFriend, name: e.target.value })
              }
            />

            <InputLabel icon="🌄 " text="Image URL" />
            <input
              name="image"
              type="text"
              value={newFriend.image}
              onChange={(e) =>
                setNewFriend({ ...newFriend, image: e.target.value })
              }
            />

            <Button text="Add" />
          </form>
          <Button
            text="Close"
            onClick={() => setShowAddFriend(!showAddFriend)}
          />
        </>
      )}
    </div>
  );
}

function FriendsList({ friendsList, onSelectFriend }) {
  return (
    <div>
      <ul>
        {friendsList.map((friend) => (
          <li key={friend.id}>
            <Friend
              friend={friend}
              friendsList={friendsList}
              onSelectFriend={onSelectFriend}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Friend({ friend, onSelectFriend }) {
  return (
    <>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${friend.balance}
        </p>
      )}

      <Button text="Select" onClick={() => onSelectFriend(friend.id)} />
    </>
  );
}

function SplitBill({ friend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const [payee, setPayee] = useState("You");
  const [friendsExpense, setFriendsExpense] = useState(
    bill && yourExpense && bill - yourExpense
  );

  const newBalance =
    friend.balance + (payee === "You" ? friendsExpense : yourExpense * -1);

  return (
    <div>
      <form
        name="form-split-bill"
        className="form-split-bill"
        onSubmit={(e) => {
          onSplitBill(e, newBalance);
          setBill("");
          setYourExpense("");
          setFriendsExpense("");
          setPayee("You");
        }}
      >
        <h2>Split a bill with {friend.name}</h2>

        <InputLabel icon="💰" text="Bill value" />
        <input
          name="bill"
          type="text"
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
        />

        <InputLabel icon="🧍🏻‍♀️" text="Your expense" />
        <input
          name="yourExpense"
          type="text"
          value={yourExpense}
          onChange={(e) => {
            setYourExpense(Number(e.target.value));
            setFriendsExpense(bill - Number(e.target.value));
          }}
        />

        <InputLabel icon="👭" text={`${friend.name}'s expense`} />
        <input
          name="friendsExpense"
          type="text"
          value={friendsExpense}
          onChange={(e) => {
            setFriendsExpense(Number(e.target.value));
            setYourExpense(bill - Number(e.target.value));
          }}
        />

        <InputLabel icon="🤑" text="Who is paying the bill?" />
        <select
          name="payee"
          value={payee}
          onChange={(e) => {
            setPayee(e.target.value);
          }}
        >
          <option>You</option>
          <option>{friend.name}</option>
        </select>

        <Button text="Split Bill" />
      </form>
    </div>
  );
}
