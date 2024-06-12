import React from 'react';
import { CategoryButton } from 'uikit';
import { MainLayout } from "layouts";

function Home() {
  return (
    <MainLayout isMainPage={true}>
        <div className="category-list">
          <CategoryButton title='Детские сады' link="/kindergarten"  />
          <CategoryButton title='Секции' link="/sections"  />
        </div>
    </MainLayout>

  )
}

export default Home