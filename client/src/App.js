import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeLayout from './layouts/HomeLayout';
import HomePage from './pages/HomePage';
import FreeBoardPage from './pages/FreeBoard/FreeBoardPage';
import WritePostPage from './pages/FreeBoard/WritePostPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PostDetailPage from './pages/FreeBoard/PostDetailPage';
import MyPage from './pages/MyPage';
import NoticePage from './pages/Notice/NoticePage';
import NoticeWritePage from './pages/Notice/NoticeWritePage';
import NoticeDetailPage from './pages/Notice/NoticeDetailPage';
import EditPostPage from './pages/EditPostPage';

import EducationBoardPage from './pages/Education/EducationBoardPage';
import EducationDetailPage from './pages/Education/EducationDetailPage';
import EducationWritePage from './pages/Education/EducationWritePage';

import EconomicsBoardPage from './pages/Economics/EconomicsBoardPage';
import EconomicsDetailPage from './pages/Economics/EconomicsDetailPage';
import EconomicsWritePage from './pages/Economics/EconomicsWritePage';

import BusinessBoardPage from './pages/Business/BusinessBoardPage';
import BusinessDetailPage from './pages/Business/BusinessDetailPage';
import BusinessWritePage from './pages/Business/BusinessWritePage';

import Es1BoardPage from './pages/Engineering/Es1/Es1BoardPage';
import Es1DetailPage from './pages/Engineering/Es1/Es1DetailPage';
import Es1WritePage from './pages/Engineering/Es1/Es1WritePage';

import Es2BoardPage from './pages/Engineering/Es2/Es2BoardPage';
import Es2DetailPage from './pages/Engineering/Es2/Es2DetailPage';
import Es2WritePage from './pages/Engineering/Es2/Es2WritePage';

import Es3BoardPage from './pages/Engineering/Es3/Es3BoardPage';
import Es3DetailPage from './pages/Engineering/Es3/Es3DetailPage';
import Es3WritePage from './pages/Engineering/Es3/Es3WritePage';

import Us1BoardPage from './pages/Urban/Us1/Us1BoardPage';
import Us1DetailPage from './pages/Urban/Us1/Us1DetailPage';
import Us1WritePage from './pages/Urban/Us1/Us1WritePage';

import Us2BoardPage from './pages/Urban/Us2/Us2BoardPage';
import Us2DetailPage from './pages/Urban/Us2/Us2DetailPage';
import Us2WritePage from './pages/Urban/Us2/Us2WritePage';

import Us3BoardPage from './pages/Urban/Us3/Us3BoardPage';
import Us3DetailPage from './pages/Urban/Us3/Us3DetailPage';
import Us3WritePage from './pages/Urban/Us3/Us3WritePage';

import Us4BoardPage from './pages/Urban/Us4/Us4BoardPage';
import Us4DetailPage from './pages/Urban/Us4/Us4DetailPage';
import Us4WritePage from './pages/Urban/Us4/Us4WritePage';

import GraduateBoardPage from './pages/Graduate/GraduateBoardPage';
import GraduateDetailPage from './pages/Graduate/GraduateDetailPage';
import GraduateWritePage from './pages/Graduate/GraduateWritePage';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 레이아웃 구조 */}
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
          <Route path="board/free" element={<FreeBoardPage />} />
          <Route path="board/free/write" element={<WritePostPage />} />
          <Route path="/board/free/:postId" element={<PostDetailPage />} />

          <Route path="/board/major/education" element={<EducationBoardPage />} />
          <Route path="/board/major/education/:postId" element={<EducationDetailPage />} />
          <Route path="/board/major/education/write" element={<EducationWritePage />} />

          <Route path="/board/major/economics" element={<EconomicsBoardPage />} />
          <Route path="/board/major/economics/:postId" element={<EconomicsDetailPage />} />
          <Route path="/board/major/economics/write" element={<EconomicsWritePage />} />

          <Route path="/board/major/business" element={<BusinessBoardPage />} />
          <Route path="/board/major/business/:postId" element={<BusinessDetailPage />} />
          <Route path="/board/major/business/write" element={<BusinessWritePage />} />

          <Route path="/board/major/es1" element={<Es1BoardPage />} />
          <Route path="/board/major/es1/:postId" element={<Es1DetailPage />} />
          <Route path="/board/major/es1/write" element={<Es1WritePage />} />
          
          <Route path="/board/major/es2" element={<Es2BoardPage />} />
          <Route path="/board/major/es2/:postId" element={<Es2DetailPage />} />
          <Route path="/board/major/es2/write" element={<Es2WritePage />} />

          <Route path="/board/major/es3" element={<Es3BoardPage />} />
          <Route path="/board/major/es3/:postId" element={<Es3DetailPage />} />
          <Route path="/board/major/es3/write" element={<Es3WritePage />} />

          <Route path="/board/major/us1" element={<Us1BoardPage />} />
          <Route path="/board/major/us1/:postId" element={<Us1DetailPage />} />
          <Route path="/board/major/us1/write" element={<Us1WritePage />} />

          <Route path="/board/major/us2" element={<Us2BoardPage />} />
          <Route path="/board/major/us2/:postId" element={<Us2DetailPage />} />
          <Route path="/board/major/us2/write" element={<Us2WritePage />} />

          <Route path="/board/major/us3" element={<Us3BoardPage />} />
          <Route path="/board/major/us3/:postId" element={<Us3DetailPage />} />
          <Route path="/board/major/us3/write" element={<Us3WritePage />} />

          <Route path="/board/major/us4" element={<Us4BoardPage />} />
          <Route path="/board/major/us4/:postId" element={<Us4DetailPage />} />
          <Route path="/board/major/us4/write" element={<Us4WritePage />} />

          <Route path="/board/major/graduate" element={<GraduateBoardPage />} />
          <Route path="/board/major/graduate/:postId" element={<GraduateDetailPage />} />
          <Route path="/board/major/graduate/write" element={<GraduateWritePage />} />

          <Route path="/mypage" element={<MyPage />} />
          <Route path="/board/notice" element={<NoticePage />} />
          <Route path="/board/notice/write" element={<NoticeWritePage />} />
          <Route path="/board/notice/:id" element={<NoticeDetailPage />} />
          <Route path="/edit/:postId" element={<EditPostPage />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
