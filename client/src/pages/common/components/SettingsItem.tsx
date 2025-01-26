type props = {
	title?: string;
	children: React.ReactNode;
};

import "../common_styles.css";

const SettingsItem = ({ title, children }: props) => {
	return (
		<div className="settings-section">
			<div className="settings-section-inner">
				<div className="settings-title">{title}</div>
				<div className="settings-body">{children}</div>
			</div>
		</div>
	);
};

export default SettingsItem;
