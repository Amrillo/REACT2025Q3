import type { FC } from 'react';

export const AboutPage: FC = () => {
  return (
    <section className="about" role="region" aria-label="About section">
      <div className="container">
        <h2 className="about-title">Amrillo Akhmedov</h2>
        <p className="about-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus,
          delectus fugit laborum modi earum magnam minus in sed libero,
          consequuntur, iste repudiandae nisi rem nemo reprehenderit animi eius
          cumque ipsum!
        </p>
      </div>
    </section>
  );
};
