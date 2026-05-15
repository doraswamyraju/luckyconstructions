import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace brand-orange with brand-gold
content = content.replace(/brand-orange/g, 'brand-gold');

// Replace contact number
content = content.replace(/\+91 90000 00000/g, '+91 7893872131');
content = content.replace(/1 \(\555\) 890-1234/g, '+91 7893872131'); // if present

// Replace the Navigation LC logo
const navLogoOld = `<div className="w-10 h-10 bg-brand-gold text-white flex items-center justify-center font-display font-bold text-xl uppercase tracking-tighter group-hover:bg-brand-black transition-colors">
              LC
            </div>`;
const navLogoNew = `<img src="/logo.jpg" alt="Lucky Constructions Logo" className="h-12 w-auto object-contain" />`;
content = content.replace(navLogoOld, navLogoNew);

// Replace the Footer LC logo
const footerLogoOld = `<div className="w-10 h-10 bg-brand-black text-white flex items-center justify-center font-display font-bold text-xl uppercase tracking-tighter">
                  LC
                </div>`;
const footerLogoNew = `<img src="/logo.jpg" alt="Lucky Constructions Logo" className="h-12 w-auto object-contain" />`;
content = content.replace(footerLogoOld, footerLogoNew);

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx updated successfully');
