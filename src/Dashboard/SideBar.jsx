
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiSupport, HiTable, HiUser, HiViewBoards, HiOutlineCloudUpload, HiUsers, HiMusicNote, HiUserGroup } from 'react-icons/hi';
import MobileDashboard from './MobileDashboard';
import { useSelector } from 'react-redux';
import { MdFeed, MdMusicNote } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  const { _id, isAdmin, picture, given_name } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  return (
    <div className='hidden 2xl:block max-w-[280px] min-w-[280px]'>
      <div aria-label="Sidebar" className='hidden md:block bg-cl p-4'>
        <div>
          <ul>
            <li className='flex items-center gap-2 p-2 cursor-pointer hover:bg-black  rounded-md durtation-300 text-gray-400'
              onClick={() => navigate("/admin/dashboard")}>
              <HiChartPie />
              <p>
                Dashboard
              </p>
            </li>
            <li  className='flex items-center gap-2 p-2 cursor-pointer hover:bg-black  rounded-md durtation-300 text-gray-400'
              onClick={() => navigate("/upload-song")}
            >
              <HiOutlineCloudUpload />
              <p>
                Upload Song
              </p>
            </li>

            <li className='flex items-center gap-2 p-2 cursor-pointer hover:bg-black  rounded-md durtation-300 text-gray-400'
              onClick={() => navigate("/admin/dashboard/users")}
            >
              <HiUserGroup />
              <p>
                Users
              </p>
            </li>
            <li className='flex items-center gap-2 p-2 cursor-pointer hover:bg-black  rounded-md durtation-300 text-gray-400'
              onClick={() => navigate("/admin/dashboard/artists")}
            >
              <HiUsers />
              <p>
                Artists
              </p>
            </li>
            <li className='flex items-center gap-2 p-2 cursor-pointer hover:bg-black  rounded-md durtation-300 text-gray-400'
              onClick={() => navigate("/admin/dashboard/blogs")}
            >
              <MdFeed />
              <p>
                Blogs
              </p>
            </li>
            <li className='flex items-center gap-2 p-2 cursor-pointer hover:bg-black  rounded-md durtation-300 text-gray-400'
              onClick={() => navigate("/create-blog")}
            >
              <MdFeed />
              <p>
                Create Blog
              </p>
            </li>
          </ul>
          <ul>
          </ul>
        </div>
      </div>
      <div className='md:hidden'>
          <MobileDashboard/>
      </div>
    </div>
  )
}

export default SideBar
