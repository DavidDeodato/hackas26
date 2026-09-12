export interface AvatarConfig {
  template: 'masculine' | 'feminine';
  hairStyle: 'short' | 'long' | 'curly' | 'bald';
  hairColor: string;
  skinColor: string;
  topColor: string;
  pantsColor: string;
  shoesColor: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar: AvatarConfig;
}

export const defaultAvatar: AvatarConfig = {
  template: 'masculine', hairStyle: 'short', hairColor: '#382820',
  skinColor: '#c88f68', topColor: '#304e3e', pantsColor: '#333c43', shoesColor: '#342c27',
};
