import React from 'react';
import { CategoryButton } from 'uikit';
import Header from 'components/Header';

function Home() {
  return (
    <div>
        <Header isMainPage={true} />
        <div className="category-list">
          <CategoryButton title='Детские сады' link="/kindergarten"  />
          <CategoryButton title='Секции' link="/sections"  />
        </div>
    </div>

  )
}

export default Home