import useUserStore from "../../../store/useUserStore";

function Username() {
  const { username } = useUserStore();
  if (!username || username.trim() === "") return null;
  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

export default Username;
