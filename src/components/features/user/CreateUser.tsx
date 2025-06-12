import { useNavigate } from "react-router";
import useUserStore from "../../../store/useUserStore";
import { useState } from "react";
import Button from "../../ui/Button";

function CreateUser() {
  const { updateName } = useUserStore();
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username) {
      return;
    }

    updateName(username);
    navigate("/menu");
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your Full Name"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUsername(e.target.value)
        }
        className="input mb-8 w-72"
        value={username}
      />

      {username !== "" && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
