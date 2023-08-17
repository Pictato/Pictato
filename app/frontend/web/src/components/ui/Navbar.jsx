import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountContext from "../../contexts/account-context";
import Upload from "../upload/Upload";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import User from "../../assets/user.png";

const Navbar = ({ space }) => {
  const navigate = useNavigate();
  const { username, isSignedIn, signOut } = useContext(AccountContext);
  const spaceRef = useRef();

  const handleMoveSpace = () => {
    navigate(`/${spaceRef.current.value}`);
  };

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <div className="navbar bg-base-100 shadow-xl rounded-box">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">{space}의 Pictato</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <form className="join">
            <input
              type="text"
              placeholder="사용자 검색"
              className="input input-bordered join-item w-24 md:w-auto"
              ref={spaceRef}
            />
            <button
              onClick={handleMoveSpace}
              className="btn btn-secondary join-item"
            >
              <AiOutlineSearch size="16" />
            </button>
          </form>
        </div>
        {username === space && (
          <>
            <div className="tooltip tooltip-bottom" data-tip="추가">
              <button
                className="btn btn-accent btn-square"
                onClick={() => window.upload_modal.showModal()}
              >
                <AiOutlinePlus size="16" />
              </button>
            </div>
            <Upload />
          </>
        )}
        {isSignedIn ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={User} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link
                  to={`/${username}`}
                  className="justify-between"
                  reloadDocument
                >
                  {username}
                  <span className="badge">나의 사진첩</span>
                </Link>
              </li>
              <li>
                <a onClick={handleSignOut}>로그아웃</a>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/" className="btn btn-primary">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
