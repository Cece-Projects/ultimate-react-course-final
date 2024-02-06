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

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function InputLabel({ icon, text }) {
  return (
    <label>
      {icon} {text}
    </label>
  );
}

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends([...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelectFriend(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleSplitBill(e, newBalance) {
    e.preventDefault();

    setFriends(() =>
      friends.map((friend) =>
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
            friends={friends}
            onSelectFriend={handleSelectFriend}
            selectedFriend={selectedFriend}
          />

          {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

          <Button onClick={handleShowAddFriend}>
            {!showAddFriend ? "Add Friend" : "Close"}
          </Button>
        </div>
        {selectedFriend && (
          <FormSplitBill
            selectedFriend={selectedFriend}
            onSplitBill={handleSplitBill}
          />
        )}
      </div>
    </main>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [userExpense, setUserExpense] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  const friendsExpense = bill ? bill - userExpense : "";
  const newBalance =
    selectedFriend.balance +
    (whoIsPaying === "user" ? friendsExpense : userExpense * -1);

  return (
    <div>
      <form
        name="form-split-bill"
        className="form-split-bill"
        onSubmit={(e) => {
          onSplitBill(e, newBalance);
          setBill("");
          setUserExpense("");
          // setFriendsExpense("");
          setWhoIsPaying("user");
        }}
      >
        <h2>Split a bill with {selectedFriend.name}</h2>

        <InputLabel icon="💰" text="Bill value" />
        <input
          name="bill"
          type="text"
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
        />

        <InputLabel icon="🧍🏻‍♀️" text="Your expense" />
        <input
          name="userExpense"
          type="text"
          value={userExpense}
          onChange={(e) => {
            setUserExpense(Number(e.target.value));
            // setFriendsExpense(bill - Number(e.target.value));
          }}
        />

        <InputLabel icon="👭" text={`${selectedFriend.name}'s expense`} />
        <input
          disabled
          name="friendsExpense"
          type="text"
          value={friendsExpense}
          // onChange={(e) => {
          //   setFriendsExpense(Number(e.target.value));
          //   setUserExpense(bill - Number(e.target.value));
          // }}
        />

        <InputLabel icon="🤑" text="Who is paying the bill?" />
        <select
          name="whoIsPaying"
          value={whoIsPaying}
          onChange={(e) => {
            setWhoIsPaying(e.target.value);
          }}
        >
          <option value="user">You</option>
          <option value="friend">{selectedFriend.name}</option>
        </select>

        <Button>Split Bill</Button>
      </form>
    </div>
  );
}

function FriendsList({ friends, onSelectFriend, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelectFriend={onSelectFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelectFriend, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
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

      <Button onClick={() => onSelectFriend(friend)}>
        {!isSelected ? "Select" : "Close"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  const id = crypto.randomUUID();
  const newFriend = {
    id,
    name: name,
    image: `${image}?=4{id}`,
    balance: 0,
  };

  return (
    <div className="sidebar">
      <form
        className="form-add-friend"
        onSubmit={(e) => {
          e.preventDefault();

          if (!name || !image) {
            return;
          }
          onAddFriend(newFriend);
          setName("");
          setImage("https://i.pravatar.cc/48");
        }}
      >
        <InputLabel icon="👭" text="Friend name" />
        <input
          name="friendName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <InputLabel icon="🌄 " text="Image URL" />
        <input
          name="image"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <Button>Add</Button>
      </form>
    </div>
  );
}
