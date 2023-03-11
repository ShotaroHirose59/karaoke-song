import { useSongStore } from "../../store/song"

export function SongTabs() {
  const { activeTab } = useSongStore()
  const changeActiveTab = useSongStore((state) => state.changeActiveTab)

  return (
    <div className="mb-4">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
        <li className="mr-2" role="presentation">
          <button 
            className={"inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600  hover:border-indigo-300 border-indigo-300" + (
              activeTab === 'all' && "border-b-2 border-indigo-600"
            )}
            onClick={() => changeActiveTab('all')}
          >
            All
          </button>
        </li>
        <li className="mr-2" role="presentation">
          <button
            className={"inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-indigo-300 border-indigo-300" + (
              activeTab === 'like' && "border-b-2 border-indigo-600"
            )}
            onClick={() => changeActiveTab('like')}
          >
            like
          </button>
        </li>
      </ul>
    </div>
  )
}