import Avatar from "./avatar";

export default function ProfileForm() {
  return (
    <div className="form-widget">
      <Avatar />
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value="" disabled />
      </div>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input id="fullName" type="text" value="" />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" value="" />
      </div>
      <div>
        <label htmlFor="website">Role</label>
        <input id="website" type="url" value="" />
      </div>

      <div>
        <button className="button primary block">Update</button>
      </div>

      <div>
        <form action="/auth/signout" method="post">
          <button className="button block" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
